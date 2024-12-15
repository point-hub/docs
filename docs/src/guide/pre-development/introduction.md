# Introduction

---
outline: deep
---

# Activity Logs

Activity logs refer to records that capture user actions and system events within an application or system. They provide a detailed account of what actions were taken, when they occurred, and often by whom. These logs are useful for:

- **Monitoring:** Keeping track of user interactions and system performance.
- **Troubleshooting:** Identifying issues by reviewing past actions leading up to an error.
- **Security:** Detecting unauthorized access or suspicious behavior.
- **Compliance:** Meeting regulatory requirements by maintaining records of actions taken.

Overall, activity logs are crucial for maintaining transparency, security, and accountability within systems.

**Activity Logs Schema**

```ts
{
  collection: 'activity_logs',
  unique: [[]],
  uniqueIfExists: [[]],
  schema: {
    bsonType: 'object',
    required: ['user', 'action', 'activity_date'],
    properties: {
      user: {
        bsonType: 'object',
        description: 'Authenticated user who perform create form',
        required: ['lookup_from', '_id', 'label'],
        properties: {
          lookup_from: {
            bsonType: 'string',
            description: 'Authenticated user who perform create form',
          },
          _id: {
            bsonType: 'objectId',
            description: 'Authenticated user who perform create form',
          },
          label: {
            bsonType: 'string',
            description: 'Authenticated user who perform create form',
          },
        }
      },
      ip_address: {
        bsonType: 'string',
        description: 'Captures the IP address from which the action was initiated. Useful for security audits and tracking suspicious activity.',
      },
      action: {
        bsonType: 'string',
        description: '',
      },
      activity_date: {
        bsonType: 'date',
        description: '',
      },
      link_preview: {
        bsonType: 'string',
        description: '',
      },
    },
  },
}
```

## Inline Records

Separated from `activity_logs` collection, we also record activity logs in each collection of a database. So here additional schema that you need to add to cover each activity.

### Create Activity

`created_by` and `created_date` field is required in each form created

```ts
...
required: [..., 'created_by', 'created_date'],
properties: {
  ...,
  created_by: {
    bsonType: 'object',
    description: 'Authenticated user who perform create form',
    required: ['lookup_from', '_id', 'label'],
    properties: {
      lookup_from: {
        bsonType: 'string',
        description: 'Collection name from lookup',
      },
      _id: {
        bsonType: 'objectId',
        description: 'Unique Identifier from lookup',
      },
      label: {
        bsonType: 'string',
        description: 'User label preview',
      },
      email: {
        bsonType: 'string',
        description: 'User email address',
      },
    }
  },
  created_date: {
    bsonType: 'date',
    description: 'The date of created form',
  },
},
```

### Update Activity

Only for Master Data using this schema, Since form transaction using duplication method to keep orinal data before update so the authorized user will be saved as created_by in the new form

```ts
...
properties: {
  ...,
  updated_by: {
    bsonType: 'object',
    description: 'Authenticated user who perform create form',
    required: ['lookup_from', '_id', 'label'],
    properties: {
      lookup_from: {
        bsonType: 'string',
        description: 'Collection name from lookup',
      },
      _id: {
        bsonType: 'objectId',
        description: 'Unique Identifier from lookup',
      },
      label: {
        bsonType: 'string',
        description: 'User label preview',
      },
      email: {
        bsonType: 'string',
        description: 'User email address',
      },
    }
  },
  updated_date: {
    bsonType: 'date',
    description: 'The date of updated form',
  },
},
```

Additional schema for updating form transaction

```ts
...
properties: {
  ...,
  updated_count: {
    bsonType: 'number',
    description: 'The date of updated form',
  },
  is_updated: {
    bsonType: 'boolean',
    description: 'The date of updated form',
  },
},
```

### Request Delete Activity

Requests to delete can only be made when the user does not have access to permission to delete data on the feature

```ts
...
properties: {
  ...,
  request_delete_by: {
    bsonType: 'object',
    description: 'Authenticated user who perform create form',
    required: ['lookup_from', '_id', 'label'],
    properties: {
      lookup_from: {
        bsonType: 'string',
        description: 'Collection name from lookup',
      },
      _id: {
        bsonType: 'objectId',
        description: 'Unique Identifier from lookup',
      },
      label: {
        bsonType: 'string',
        description: 'User label preview',
      },
      email: {
        bsonType: 'string',
        description: 'User email address',
      },
    }
  },
  request_delete_to: {
    bsonType: 'object',
    description: 'Authenticated user who perform create form',
    required: ['lookup_from', '_id', 'label'],
    properties: {
      lookup_from: {
        bsonType: 'string',
        description: 'Collection name from lookup',
      },
      _id: {
        bsonType: 'objectId',
        description: 'Unique Identifier from lookup',
      },
      label: {
        bsonType: 'string',
        description: 'User label preview',
      },
      email: {
        bsonType: 'string',
        description: 'User email address',
      },
    }
  },
  request_delete_date: {
    bsonType: 'date',
    description: 'The date of updated form',
  },
  request_delete_reason: {
    bsonType: 'string',
    description: 'The reason of updating form',
  },
  request_delete_status: {
    bsonType: 'string',
    description: 'state of delete status "pending" is the default value when request delete., "approved" when request delete approved then the form will be canceled, "rejected" when request delete rejected.',
  },
},
```

### Delete Activity

Soft delete only applied to Form Transaction, in Form Master we use hard delete instead to prevent confusion from same unique index

```ts
...
properties: {
  ...,
  deleted_by: {
    bsonType: 'object',
    description: 'Authenticated user who perform create form',
    required: ['lookup_from', '_id', 'label'],
    properties: {
      lookup_from: {
        bsonType: 'string',
        description: 'Collection name from lookup',
      },
      _id: {
        bsonType: 'objectId',
        description: 'Unique Identifier from lookup',
      },
      label: {
        bsonType: 'string',
        description: 'User label preview',
      },
      email: {
        bsonType: 'string',
        description: 'User email address',
      },
    }
  },
  deleted_date: {
    bsonType: 'date',
    description: 'The date of deleted form',
  },
  deleted_reason: {
    bsonType: 'string',
    description: 'The date of deleted form',
  },
  is_deleted: {
    bsonType: 'boolean',
    description: 'The state of deleted form',
  },
},
```

### Request Approval Activity

```ts
...
properties: {
  ...,
  request_approval_by: {
    bsonType: 'object',
    description: 'Authenticated user who perform create form',
    required: ['lookup_from', '_id', 'label'],
    properties: {
      lookup_from: {
        bsonType: 'string',
        description: 'Collection name from lookup',
      },
      _id: {
        bsonType: 'objectId',
        description: 'Unique Identifier from lookup',
      },
      label: {
        bsonType: 'string',
        description: 'User label preview',
      },
      email: {
        bsonType: 'string',
        description: 'User email address',
      },
    }
  },
  request_approval_to: {
    bsonType: 'object',
    description: 'Authenticated user who perform create form',
    required: ['lookup_from', '_id', 'label'],
    properties: {
      lookup_from: {
        bsonType: 'string',
        description: 'Collection name from lookup',
      },
      _id: {
        bsonType: 'objectId',
        description: 'Unique Identifier from lookup',
      },
      label: {
        bsonType: 'string',
        description: 'User label preview',
      },
      email: {
        bsonType: 'string',
        description: 'User email address',
      },
    }
  },
  request_approval_date: {
    bsonType: 'date',
    description: 'The date of updated form',
  },
  request_approval_status: {
    bsonType: 'string',
    description: 'state of delete status "pending" is the default value when request delete., "approved" when request delete approved then the form will be canceled, "rejected" when request delete rejected.',
  },
  request_approval_rejected_reason: {
    bsonType: 'string',
    description: 'The reason of updating form',
  },
},
```

### Approval Activity

```ts
...
properties: {
  ...,
  approved_by: {
    bsonType: 'object',
    description: 'Authenticated user who perform create form',
    required: ['lookup_from', '_id', 'label'],
    properties: {
      lookup_from: {
        bsonType: 'string',
        description: 'Collection name from lookup',
      },
      _id: {
        bsonType: 'objectId',
        description: 'Unique Identifier from lookup',
      },
      label: {
        bsonType: 'string',
        description: 'User label preview',
      },
      email: {
        bsonType: 'string',
        description: 'User email address',
      },
    }
  },
  approved_date: {
    bsonType: 'date',
    description: 'The date of approved form',
  },
  is_approved: {
    bsonType: 'boolean',
    description: 'The state of approved form',
  },
},
```
