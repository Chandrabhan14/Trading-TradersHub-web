function formatMarketCap(marketCap) {
    if (typeof marketCap !== 'number') {
        return "--";
    }

    const billion = 1e9;
    const million = 1e6;
        const thousand = 1e3;

    if (marketCap >= billion) {
        return (marketCap / billion).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "B";
    } else if (marketCap >= million) {
        return (marketCap / million).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "M";
    } else if (marketCap >= thousand) {
        return (marketCap / thousand).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "K";
    } else {
        return marketCap.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

export default formatMarketCap