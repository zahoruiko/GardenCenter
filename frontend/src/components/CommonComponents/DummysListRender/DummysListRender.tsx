import React from 'react';

type TDummysListRenderProps = {
  listItem: React.FC;
  shortList?: boolean;
}

const DummysListRender: React.FC<TDummysListRenderProps> = ({ listItem, shortList = false }) => {
  let amountElements = 8;
  if (shortList === true)
    amountElements = 4;
  return (
    <>
      {
        new Array(amountElements).fill(0).map((data, i) => (
          listItem({ key: i })
        ))
      }
    </>
  )
}

export default DummysListRender;