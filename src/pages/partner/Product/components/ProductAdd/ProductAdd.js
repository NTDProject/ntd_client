import React, { useState, useEffect } from 'react';

const ProductAdd = props => {
  
    const [open, setOpen] = useState(props.open);

    useEffect(() => {
      console.log(open);
    }, [open]);

  return (
    <div>
        {open}
    </div>
  );
};

export default ProductAdd;
