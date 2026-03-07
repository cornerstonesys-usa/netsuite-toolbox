/**
 * @NApiVersion 2.1
 */
define(['N/query'],
/**
 * @param {query} query
 */
(query) => {

    const queryAll = (options, mapping) => {
        
        if (!options.activeQuery && !options.query) 
            throw new Error('There must be a provided options.activeQuery or options.query value.');

        if (!options.customId) 
            throw new Error('There must be a provided options.customId value.'); 
        
        if (!options.pageSize) 
            options.pageSize = 1000;
        
        if (!options.breakSize) 
            options.breakSize = 250000;
        
        var results = (options.query) 
            ? query.runSuiteQLPaged({ 
                query: options.query,
                params: options.params || [],
                pageSize: options.pageSize,
                customScriptId: options.customId
            }) 
            : options.activeQuery.runPaged({
                pageSize: options.pageSize,
                customScriptId: options.customId
            });

        mapping = mapping || ((result) => result);
        
        var output = [];
        
        results.iterator().each((page) => {
            output = output.concat(page.value.data.results.map(mapping));
            return output.length < options.breakSize;
        });
        
        return output;
    }

    return { queryAll }

});
