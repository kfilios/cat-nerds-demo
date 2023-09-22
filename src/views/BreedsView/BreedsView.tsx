import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useGetCatBreedsQuery } from "api";
import { DisplayError, Loading, Modal } from "components";
import { selectLoadDataOnInit } from "store/settingsSlice";
import { extractRtkError } from "utils";
import BreedImagesModal from "./BreedImagesModal";

const BreedsView = () => {
  const { breedId } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading, refetch } = useGetCatBreedsQuery();

  const loadDataOnInit = useSelector(selectLoadDataOnInit);

  let [modalOpen, setModalOpen] = useState(false);
  let [selectedBreed, setSelectedBreed] = useState("");

  function closeModal() {
    navigate("/breeds");
    setModalOpen(false);
  }

  useEffect(() => {
    if (loadDataOnInit) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (breedId) setModalOpen(true);
    else setModalOpen(false);
  }, [breedId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <DisplayError>{extractRtkError(error)}</DisplayError>;
  }

  if (!data) {
    return <div>No data found.</div>;
  }

  const selectBreed = (name: string, id: string) => {
    setSelectedBreed(name);
    navigate(`/breed/${id}`);
  };

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold text-rose-400">
        Check out all these kinds of cat breeds!
      </h1>
      <p className="mb-2">
        Click on an item below to get photos of this specific breed.
      </p>
      <div className="flex flex-col gap-2">
        {data.map(({ id, name: breedName }) =>
          id ? (
            <button key={id}>
              <div
                key={id}
                onClick={() => selectBreed(breedName ?? "", id)}
                className="rounded-md bg-slate-600 p-3 text-white hover:bg-slate-500"
              >
                {breedName}
              </div>
            </button>
          ) : null,
        )}
      </div>
      <Modal onClose={closeModal} open={modalOpen} width="max-w-5xl">
        <BreedImagesModal
          breedName={selectedBreed}
          breedId={breedId ?? ""}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};

export default BreedsView;
