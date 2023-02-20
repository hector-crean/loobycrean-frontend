	
    type Data = {y: number, xs: Array<number>}
    
    
    // We can only visualise data in up to 3 dimensions, otherwise we need to use 'projections' like PCA (principal component analysis)
	enum Dimension {
		D1 = "D1",
		// D2 = "D2",
		// D3 = "D3",
	}

    // Functions/Data which have more than 3 independent variabels cannot be visualised without first projecting them into a lower dimensional space. We can
    // of course simple hold these other independent variables constant, and see a 'cut' through the space. Often (when we get experimenal data) we can simple plot
    // the relationship between 2 variables. Here we are assuming that other independent variabels are kept constnat, even if this is not the case...
    /**
     * @ref https://en.wikipedia.org/wiki/Principal_component_analysis
     * The principal components of a collection of points in a real coordinate space are a sequence of {\displaystyle p}p unit vectors, 
     * where the {\displaystyle i}i-th vector is the direction of a line that best fits the data while being orthogonal to the first 
     * {\displaystyle i-1}i-1 vectors. Here, a best-fitting line is defined as one that minimizes the average squared perpendicular distance 
     * from the points to the line.
     */

interface MultivariateMap {
		D1: { y: number; x1: number };
		D2: { y: number; x1: number, x2: number};
		D3: { y: number; x1: number, x2: number, x3: number };
}



interface VisualisableData<T> {
    data: Array<T> 
    projection: (datum: T) => MultivariateMap[Dimension]
}


export type { MultivariateMap, VisualisableData };
export { Dimension}
