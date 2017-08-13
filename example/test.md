## Usage

```javascript
var Parser = new htmlparser.Parser(<obj> handler,[<obj> options]);
```

## Streaming
```javascript
import Button from 'melon/Button';
import React, {PureComponent} from 'react';
export default class ButtonDemo extends PureComponent {
    render() {
        return (
            <div>
                <Button onClick={() => console.log('click')}>heihei</Button>
            </div>
        );
    }
}
```

```react 一个按钮的示例
import Button from 'melon/Button';
import React, {PureComponent} from 'react';
export default class ButtonDemo extends PureComponent {
    render() {
        return (
            <div>
                <Button onClick={() => console.log('click')}>heihei</Button>
            </div>
        );
    }
}
```

__Note:__ It is recommended to always pass the `decodeEntities` option (as described below) to the constructor; see [#105](https://github.com/fb55/htmlparser2/issues/105) for a potential issue.

__Note:__ When streaming non ASCII data, make sure to use a [StringDecoder](https://nodejs.org/api/string_decoder.html) in order to prevent certain non ASCII characters from being [chopped appart](https://github.com/fb55/htmlparser2/pull/128).  
## Events

Names for the keys of the handler object. Only functions are valid values (the parser will break otherwise).

* `onopentag(<str> name, <obj> attributes)`
* `onopentagname(<str> name)`
* `onattribute(<str> name, <str> value)`
* `ontext(<str> text)`
* `onclosetag(<str> name)`
* `onprocessinginstruction(<str> name, <str> data)`
* `oncomment(<str> data)`
* `oncommentend()`
* `oncdatastart()`
* `oncdataend()`
* `onerror(<err> error)`
* `onreset()`
* `onend()`

## Methods
### write (alias: `parseChunk`)
Parses a chunk of data and calls the corresponding callbacks.

### end (alias: `done`)
Parses the end of the buffer and clears the stack, calls onend.

### reset
Resets buffer & stack, calls `onreset`.

### parseComplete
Resets the parser, parses the data & calls `end`.

## Option: xmlMode
Indicates whether special tags (`<script>` and `<style>`) should get special treatment and if "empty" tags (eg. `<br>`) can have children. If false, the content of special tags will be text only.

For feeds and other XML content (documents that don't consist of HTML), set this to true. Default: false.

## Option: decodeEntities
If set to true, entities within the document will be decoded. Defaults to false.

## Option: lowerCaseTags
If set to true, all tags will be lowercased. If `xmlMode` is disabled, this defaults to true.

## Option: lowerCaseAttributeNames
If set to true, all attribute names will be lowercased. This has noticeable impact on speed, so it defaults to false.

## Option: recognizeCDATA
If set to true, CDATA sections will be recognized as text even if the `xmlMode` option is not enabled. NOTE: If `xmlMode` is set to `true` then CDATA sections will always be recognized as text.

## Option: recognizeSelfClosing
If set to true, self-closing tags will trigger the `onclosetag` event even if `xmlMode` is not set to `true`. NOTE: If `xmlMode` is set to `true` then self-closing tags will always be recognized.
