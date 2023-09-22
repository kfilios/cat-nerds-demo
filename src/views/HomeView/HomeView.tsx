import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useGetItemByIdQuery, useGetItemsQuery } from "api";
import { selectLoadDataOnInit } from "store/settingsSlice";
import { extractRtkError } from "utils";
import { Button, DisplayError, Loading, Modal } from "components";

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
      <p>Items:</p>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.id} - {item.url}
          </li>
        ))}
      </ul>
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
    </>
  );
}

export default HomeView;
