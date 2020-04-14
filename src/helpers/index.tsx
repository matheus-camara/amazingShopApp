export const buildQueryString = (param: any) => {
    return "?" + Object.entries(param)
        .map((entry: [string, any]) =>
            entry.map(encodeURIComponent)
                .join('='))
        .join('&')
}