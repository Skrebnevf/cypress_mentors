class PercyHelper {

    public createSnapshot(name: string, options?: any) {
        return cy.percySnapshot(name, options) 
    }
}

export const percyHelper = new PercyHelper()