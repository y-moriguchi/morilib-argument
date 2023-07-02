# Morilib Argument

Morilib Argument is matcher of arguments like Erlang.

## How to use

To create Morilib Pattern object by calling Pattern function.

```javascript
const A = Argument();
```

To match by patterns by calling P.pattern function.  
If arguments is not any pattern, P.pattern throws exception.

```
const func = A.pattern([{
    pattern: pattern function,
    f: function to execute
},
{
    pattern: ...
    f: ...
},
...
]);
```

## pattern matching

To matching array, you write array of matching function.

```javascript
const func = A.pattern([{
    pattern: [A.pred(0, A.type("number")), A.pred(1, A.type("string"))],
    f: (x, y) => x + y
}]);
```

### P.pred function

To match required argument, you use A.pred function.

```
A.pred(index of argument, predicate)
```

To match optional argument, A.opt function is available.  

```
A.opt(index of argument, predicate, default_value)
```

To match repeat argument, A.repeat function is available.  
Maching by A.repeat uses backtracking.

```
A.repeat(index of argument, predicate);
```

### predicates

Predicate is a function which recieves object to match.  
Predefined predicate is shown as follows.

|name|description|
|:---|:----|
|A.empty|matches empty array|
|A.any|any object|
|A.type|matches object type (typeof operator)|
|A.is|matches class (instanceof operator)|

### first and rest array

A.firstRest function will match first element and rest elements.  
This is an example of quick sort.

```javascript
const qsort = A.pattern([
{
    pattern: A.pred(-1, A.empty),
    f: () => []
},
{
    pattern: A.firstRest,
    f: (pivot, rest) => qsort(...rest.filter(x => x < pivot)).concat([pivot]).concat(qsort(...rest.filter(x => x >= pivot)))
}]);
```

### choice

A.choice function will match arguments of P.choice.

```javascript
const f1 = A.pattern([
{
    pattern: A.choice([1, 2], [2, 3]),
    f: () => "ok"
}]);
```

