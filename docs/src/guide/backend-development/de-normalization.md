# (De)Normalization

In MongoDB, references (Normalization) and duplicates (Denormalization) represent different ways of handling relationships between data, and both have their pros and cons depending on the use case. Let's break down the concepts:

## Reference Data (Normalization)

In a referenced model, data in one document is linked to another document, typically using ObjectIds (MongoDB's default identifier) or other unique identifiers.

### How References Work

- One document stores an ObjectId or a reference to another document, rather than embedding all the data directly.
- The reference serves as a pointer to the document in a different collection.
- Referencing is similar to foreign keys in relational databases, but MongoDB doesn’t enforce any relationship constraints.

### Example

Imagine you have a users collection and an orders collection. Each order refers to a user through their ObjectId:

```ts
// User document
{
  _id: ObjectId("605c72ef153207001f0a3b8"),
  name: "John Doe",
  email: "john@example.com"
}

// Order document (references user)
{
  _id: ObjectId("605c72ef153207001f0a3c9"),
  order_number: "ORD12345",
  user_id: ObjectId("605c72ef153207001f0a3b8"),  // Reference to User
  items: [
    { product: "Laptop", quantity: 1 },
    { product: "Mouse", quantity: 2 }
  ]
}
```

### Advantages of References

- **Avoids duplication:** Since you are not storing the same data repeatedly, you save on storage.
- **Flexibility:** You can update the referenced document independently without having to update all references.
- **Less data duplication:** Data like user information doesn’t need to be duplicated for every order.

### Disadvantages of References

- **Multiple queries:** To retrieve data, you often need to perform additional queries to resolve references (e.g., fetching the order, then fetching the user).
- **Potential for data inconsistency:** Since the referenced data lives in another collection, there's a risk that the referenced data may become out of sync if not managed properly.

## Duplicate Data (Denormalization)

In a duplicate model, related data is embedded within the document itself, meaning all relevant data is duplicated in each document.

### How Duplicates Work

- The related data is stored inside the same document, which can result in larger document sizes but fewer queries since all necessary information is contained within the document.
- This approach is often referred to as denormalization because the same information may be stored in multiple places.

### Example

Using the same users and orders example, you can embed the user information directly into the order document:

```ts
// Order document with embedded user data
{
  _id: ObjectId("605c72ef153207001f0a3c9"),
  order_number: "ORD12345",
  user: {
    name: "John Doe",
    email: "john@example.com"
  },
  items: [
    { product: "Laptop", quantity: 1 },
    { product: "Mouse", quantity: 2 }
  ]
}
```
 
### Advantages of Duplicates

- **Fewer queries:** You don’t need to perform multiple queries to gather related data. The data is all contained within a single document.
- **Faster reads:** As everything is embedded, retrieving the document gives you all the data you need, which can improve read performance.
- **Simpler data model:** For applications that prioritize fast reads or where the data doesn’t change frequently, this can simplify your application logic.

### Disadvantages of Duplicates

- **Data duplication:** The same data is stored multiple times. For example, if the user changes their email, you’ll have to update all orders associated with that user.
- **Increased storage usage:** The more data is duplicated, the more storage is required, which can be inefficient, especially for large datasets.
- **Potential for inconsistency:** If data is updated in one place (e.g., user information), it may not be reflected in other documents, leading to inconsistent data.

## Key Differences

| Aspect | References | Duplicates (Embedding) |
| --- | --- | --- |
| Data Storage | Stores only references (IDs), avoids duplication. | Data is embedded within the document, leading to duplication. |
| Performance (Reads) | May require multiple queries (to fetch references). | Faster reads, as all data is in one document. |
| Performance (Writes) | Updates to referenced data are easier and affect only the referenced collection. | Updates to embedded data need to be done for every document where it is embedded. |
| Consistency | Can be more consistent as there’s a single source of truth (the referenced document). | Can lead to data inconsistency if embedded data is not updated in all documents.
| Storage Efficiency | More efficient storage, especially for large, repeating data. | Less storage-efficient, as the same data is repeated across many documents. |
| Data Complexity | More complex queries and logic, since you have to resolve references. | Simpler queries, but more complex data updates. |
| Use Case | Suitable for data that is frequently updated or has a 1-to-many relationship. | Suitable for data that is read-heavy and rarely changes, like catalog data. |

## When to Use

###  References

- **When data is frequently updated:** If your referenced data (e.g., user information) changes often, referencing avoids the need to update multiple documents.
- **When relationships are complex or many-to-many:** When you have entities that are linked in more complex ways (e.g., a product is in many orders), referencing helps avoid excessive duplication.
- **When you have large datasets:** If documents are growing large due to embedding too much data, using references may reduce document size.

###  Duplicates

- **When data is rarely updated:** If your data doesn’t change often (e.g., static information like product details), embedding it reduces the need for joins or extra queries.
- **When you need faster reads:** Embedding data makes queries faster because there’s no need for additional lookups to resolve references.
- **For small datasets or less complex relationships:** If your data model is simple and your data doesn’t require frequent updates, duplication can be a better choice.

## Hybrid Approach: Reference and Embed

In many cases, a hybrid model can be used, where some data is embedded for fast reads, and other data is referenced to avoid duplication and maintain consistency.

For example:

- Embed frequently accessed, less-changing data (like product details in an order).
- Reference rarely changing, large, or frequently updated data (like user profiles or inventory records).

## Conclusion

- References are useful when you need to avoid duplication and have frequent updates, while duplicates (embedding) are suited for applications that prioritize read performance and have less need for frequent updates.
- The choice between these two approaches depends on the nature of your data, your query patterns, and your specific application requirements.
