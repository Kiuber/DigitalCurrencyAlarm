const PATH = '__dirname';

const getAssetDir: (fileName: string) => string = function (fileName: string): string {
    return `${PATH}/../asset/${fileName}`
};

export { getAssetDir }