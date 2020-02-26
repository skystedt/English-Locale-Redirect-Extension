const microsoftDomains = ["microsoft\\.com", "office\\.com"];
const microsoftLocalizedUrl = (locale) => `(https?://(?:[^\\.]+\\.)?(?:${microsoftDomains.join("|")}))/${locale}/(.*)`;

// https://developer.chrome.com/extensions/declarativeWebRequest#type-RedirectByRegEx
chrome.declarativeWebRequest.onRequest.addRules([{
    priority: 100,
    conditions: [new chrome.declarativeWebRequest.RequestMatcher({
        resourceType: ["main_frame"],
        stages: ["onBeforeRequest"],
        url: {
            urlMatches: microsoftLocalizedUrl("..-..")
        }
    })],
    actions: [new chrome.declarativeWebRequest.RedirectByRegEx({
        from: microsoftLocalizedUrl("..-.."),
        to: "$1/en-us/$2"
    })]
}, {
    priority: 1000,
    conditions: [new chrome.declarativeWebRequest.RequestMatcher({
        resourceType: ["main_frame"],
        stages: ["onBeforeRequest"],
        url: {
            urlMatches: microsoftLocalizedUrl("en-us")
        }
    })],
    actions: [new chrome.declarativeWebRequest.IgnoreRules({
        lowerPriorityThan: 1000
    })]
}]);