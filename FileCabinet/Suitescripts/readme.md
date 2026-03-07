# Module Listing

Below is a listing of modules and their example usage.

[searchAll](## Sample Usage for searchAll) <br>
[queryAll](## Sample Usage for queryAll) <br>

## Sample Usage for searchAll

```javascript

searchAll(options, mapping);

// options = { activeSearch, pageSize=1000, breakSize=25000 };
// activeSearch = id or scriptid of a search in your instance
// mapping = lambda which handles the result that is returned by the search

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

// options = { query, customId, pageSize=1000, breakSize=25000 };
// query = suiteql command in text form
// customId = a unique id for the query for history purposes
// mapping = lambda which handles the result that is returned by the query

// SQL Usage

const results = queryAll({
    query: orderSql,
    customId: 'allOrders_x'
}, (result) => {
    date: result.values[0],
    customer: result.values[1],
    amount: parseFloat(result.values[2]) || 0
});

// options = { activeQuery, customId, pageSize=1000, breakSize=25000 };
// activeQuery = id or script id of an analytics dataset
// customId = a unique id for the query for history purposes
// mapping = lambda which handles the result that is returned by the query

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

