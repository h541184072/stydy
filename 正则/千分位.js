function format(num) {
    return (num + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
}

// Number.prototype.toLocaleString
// 11111.11.toLocaleString()

//


/(\d{1,3})(?=(\d{3})+(?=$|\.))/g

/(\d{1,3})(?=(\d{3})+(?:$|\.))/g


// (?:pattern) 与 (?=pattern)都匹配pattern，但不会把pattern结果放到Matches的集合中，即Matcher.group()不会匹配到(?;pattern)与(?=pattern)

// 区别

// (?:pattern) 匹配得到的结果包含pattern，(?=pattern) 则不包含。如：
// 对字符串："industry abc"的匹配结果：
// industr(?:y|ies) ---> "industry"
// industr(?=y|ies) ---> "industr"

// 是否消耗字符
// (?:pattern) 消耗字符，下一字符匹配会从已匹配后的位置开始。
// (?=pattern) 不消耗字符，下一字符匹配会从预查之前的位置开始。
// 即后者只预查，不移动匹配指针。如：
