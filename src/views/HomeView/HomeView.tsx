import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useGetItemByIdQuery, useGetItemsQuery } from "api";
import { selectGridSize, selectLoadDataOnInit } from "store/settingsSlice";
import { extractRtkError } from "utils";
import { Button, DisplayError, Loading, Modal } from "components";

function getSplittedData(arr: string[], chunkCount: number): string[][] {
  const result: string[][] = [];
  const chunkSize = Math.floor(arr.length / chunkCount);
  let currentIndex = 0;

  for (let i = 0; i < chunkCount; i++) {
    const chunk = arr.slice(currentIndex, currentIndex + chunkSize);
    result.push(chunk);
    currentIndex += chunkSize;
  }

  return result;
}

interface Props {
  images: string[];
}

const ImageGrid = ({ images }: Props) => {
  const gridSize = useSelector(selectGridSize);

  const renderColumns = (columnCount: number) => {
    const splittedData = getSplittedData(images, gridSize);
    const columns = [];
    for (let i = 0; i < columnCount; i++) {
      columns.push(
        <div
          key={i}
          className={`flex flex-col gap-4 ${gridSize > 1 ? "w-2/4" : ""}`}
        >
          {splittedData[i].map((src) => (
            <img src={src} alt="" className="w-full" />
          ))}
        </div>,
      );
    }
    return columns;
  };

  return <div className="flex gap-4">{renderColumns(gridSize)}</div>;
};

function HomeView() {
  const { data, error, isLoading, refetch } = useGetItemsQuery();
  const { data: cat } = useGetItemByIdQuery("9hb");

  const loadDataOnInit = useSelector(selectLoadDataOnInit);

  let [open, setOpen] = useState(false);

  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  useEffect(() => {
    if (loadDataOnInit) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <DisplayError>{extractRtkError(error)}</DisplayError>;
  }

  if (!data) {
    return <div>No data found.</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-rose-400">Hello to cat nerds!</h1>
      <p>Cat 9hb is:</p>
      <p>{cat?.url}</p>
      <Button onClick={openModal}>Open modal</Button>
      <Modal onClose={closeModal} open={open}>
        <Modal.Title>Modal title</Modal.Title>
        <Modal.Content>
          This is a notification that we will use later on!
        </Modal.Content>
        <Modal.ButtonArea>
          <Button onClick={closeModal}>Got it, thanks!</Button>
        </Modal.ButtonArea>
      </Modal>
      <ImageGrid images={data.map(({ url }) => url)} />
    </>
  );
}

export default HomeView;
