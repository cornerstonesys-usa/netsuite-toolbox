# Module Listing

Below is a listing of modules and their example usage.

[searchAll](## Sample Usage for searchAll) <br>
[queryAll](## Sample Usage for queryAll) <br>

## Sample Usage for searchAll

```javascript

// Fetch all (or up to breakSize)
const results = searchAll({
    activeSearch: orderSearch,
    pageSize: 500,        // smaller page for testing
    breakSize: 10000      // safety limit
}, (result) => {
    date: result.getValue('trandate'),
    customer: result.getText('entity'),
    amount: parseFloat(result.getValue('amount')) || 0
});

```

## Sample Usage for queryAll

```javascript

// SQL Usage

const results = queryAll({
    query: orderSql,
    customId: 'allOrders_x'
}, (result) => {
    date: result.values[0],
    customer: result.values[1],
    amount: parseFloat(result.values[2]) || 0
});

// Analytics Query Usage

const results =  queryAll({ 
    activeQuery: activeQuery, 
    customId: 'allOrders_x' 
}, result => (result) => {
    date: result.values[0],
    customer: result.values[1],
    amount: parseFloat(result.values[2]) || 0
});

```

