export interface IServerConfiguration {
    views: string;
    public: string;
    /**
     * Right place to add other middlewares
     * just before route mounting
     */
    beforeRouteInjection?: Function;
    /**
     * Right place to add other middlewares
     * just after route mounting
     */
    afterRouteInjection?: Function;
}
