import React, { useEffect } from 'react';

import magicMouse from 'magicmouse.js';

const MagicMouseComponent = () => {
  useEffect(() => {
    magicMouse();
  }, []);

}

export default MagicMouseComponent;
