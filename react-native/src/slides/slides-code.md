---
template: inverse
#.red[React vs React Native]
---
layout: false
class: center, middle

#### Example: a call to action component:
<br />

.center[![CTA](https://i.imgur.com/fQKhcCH.png)]

---
layout: false
.center[![CTA](https://i.imgur.com/fQKhcCH.png)]

```js
import React from 'react';

const CTA = ({ buttonTitle, onClick, description }) => (
  <div>
    <div onClick={onClick}>{buttonTitle}</div>
    <p>{description}</p>
  </div>
);

```

---
layout: false

.center[![CTA](https://i.imgur.com/fQKhcCH.png)]

```js
import { View, Text } from 'react-native';

const CTA = ({ buttonTitle, description }) => (
  <View>
    <Text>{buttonTitle}</Text>
    <Text>{description}</Text>
  </View>
);

```

---
layout: false
.center[![CTA](https://i.imgur.com/fQKhcCH.png)]

```js
import { View, Text, Button } from 'react-native';

const CTA = ({ buttonTitle, onPress, description }) => (
  <View>
    <Button onPress={onPress}>
      <Text>{buttonTitle}</Text>
    </Button>
    <Text>{description}</Text>
  </View>
);

```

---

template: inverse
#.red[Getting started]

---
template: inverse
#.red[Lets write some code!]
---
