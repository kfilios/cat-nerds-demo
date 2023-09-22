import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useGetRandomCatsQuery } from "api";
import { selectLoadDataOnInit } from "store/settingsSlice";
import { extractRtkError } from "utils";
import { DisplayError, Loading, Modal } from "components";
import BreedInfoModal from "./BreedInfoModal";
import ImageGrid from "./ImageGrid";

function HomeView() {
  const { catId } = useParams();
  const navigate = useNavigate();
  const {
    data: catItems,
    error: catItemsError,
    isLoading: isCatItemsLoading,
    refetch,
  } = useGetRandomCatsQuery();

  const loadDataOnInit = useSelector(selectLoadDataOnInit);

  let [modalOpen, setModalOpen] = useState(false);

  function closeModal() {
    navigate("/");
    setModalOpen(false);
  }

  useEffect(() => {
    if (loadDataOnInit) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (catId) setModalOpen(true);
    else setModalOpen(false);
  }, [catId]);

  if (isCatItemsLoading) {
    return <Loading />;
  }

  if (catItemsError) {
    return <DisplayError>{extractRtkError(catItemsError)}</DisplayError>;
  }

  if (!catItems) {
    return <div>No data found.</div>;
  }

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold text-rose-400">
        Hello to cat nerds!
      </h1>
      <p className="mb-2">Click on an image below to get more info.</p>
      <Modal onClose={closeModal} open={modalOpen}>
        <BreedInfoModal catId={catId ?? ""} closeModal={closeModal} />
      </Modal>
      <ImageGrid items={catItems} />
    </>
  );
}

export default HomeView;
