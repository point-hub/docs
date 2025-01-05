# MongoDB

Website: [https://www.mongodb.com/](https://www.mongodb.com/)<br/>
Compass: [https://www.mongodb.com/products/tools/compass](https://www.mongodb.com/products/tools/compass)<br/>
Atlas: [https://account.mongodb.com/account/login](https://account.mongodb.com/account/login)

We choose MongoDB NoSQL Database instead of traditional SQL database like MySQL or PostgreSQL because: 

- **Dynamic Schema:** MongoDB’s document-oriented model (using BSON, which is similar to JSON) allows you to store data without a fixed schema. Each document in a collection can have a different structure. 
- **Horizontal Scaling:** MongoDB supports horizontal scaling (sharding), which means you can distribute data across multiple servers, handling massive amounts of data. As your app grows, you can scale MongoDB by adding more nodes to the cluster.
- **Replica Sets:** MongoDB provides built-in replication via replica sets, ensuring high availability. Data is replicated across multiple nodes, which ensures that if one node goes down, another can take over without data loss.
- **Aggregation Framework:** MongoDB has a powerful aggregation framework that allows for complex data transformations, grouping, filtering, and sorting. This is useful for real-time analytics and reporting, and can replace complex SQL queries or even SQL-based ETL processes.
- **Infrastructure and Scaling Costs:** MongoDB’s ability to scale horizontally (across commodity servers) can be more cost-effective for large-scale applications compared to the vertical scaling of SQL databases, which might require expensive enterprise-grade hardware as the database grows.
- **ACID Support:** MongoDB ACID (Atomicity, Consistency, Isolation, Durability) compliance has evolved over time. While MongoDB was originally known for its eventual consistency model (which is more common in NoSQL databases), it has gradually incorporated ACID properties to make it more suitable for transactional applications.