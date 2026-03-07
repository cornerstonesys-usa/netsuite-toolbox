/**
 * @NApiVersion 2.1
 */
define(['N/search'],
/**
 * @param {search} search
 */
(search) => {
    
    const searchAll = (options, mapping) => {
        
        if (!options.activeSearch) 
            throw new Error('There must be a provided options.activeSearch value.');
        
        if (!options.pageSize) 
            options.pageSize = 1000;
        
        if (!options.breakSize) 
            options.breakSize = 25000;

        let resultSet = options.activeSearch.run();
        let searchIndex = 0;
        var resultSlice = null;
        var searchResults = [];
        mapping = mapping || ((result) => result);

        do {
            resultSlice = resultSet.getRange(searchIndex, searchIndex + options.pageSize);
            if (resultSlice == null) {
                break;
            }
            searchResults = searchResults.concat(resultSlice.map(mapping));            
            searchIndex = searchResults.length;
            if (searchIndex >= options.breakSize) { 
                break;
            }
        }
        while (resultSlice.length >= options.pageSize);

        return searchResults;
    }

    return { searchAll };

});