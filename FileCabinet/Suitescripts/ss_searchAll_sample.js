/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/search', '/SuiteScripts/module/searchAll.js'], (search, { searchAll }) => {

    function execute() {

        // Create a simple search
        const mySearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: [
                ['status', 'anyof', 'SalesOrd:B'],
                'AND',
                ['mainline', 'is', 'T']
            ],
            columns: [
                search.createColumn({ name: 'trandate' }),
                search.createColumn({ name: 'entity' }),
                search.createColumn({ name: 'amount' })
            ]
        });

        // Fetch all (or up to breakSize)
        const allOrders = searchAll({
            activeSearch: mySearch,
            pageSize: 500,        // smaller page for testing
            breakSize: 10000      // safety limit
        }, (result) => ({
            date: result.getValue('trandate'),
            customer: result.getText('entity'),
            amount: parseFloat(result.getValue('amount')) || 0
        }));

        log.debug('Total sales orders found', allOrders.length);
        log.debug('First few', allOrders.slice(0, 3));

        // Example: process or export results...

    }

    return { execute };
});
