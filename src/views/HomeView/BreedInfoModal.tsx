import { useEffect, useRef } from "react";

import { useGetCatByIdQuery } from "api";
import { Button, Modal } from "components";
import { extractRtkError } from "utils";

interface BreedInfoModalProps {
  catId: string;
  closeModal?: () => void;
}

const BreedInfoModal = ({ catId, closeModal }: BreedInfoModalProps) => {
  const catIdRef = useRef(catId);
  const { data, error, isLoading } = useGetCatByIdQuery(
    catIdRef?.current ?? "",
  );

  useEffect(() => {
    if (!catIdRef?.current) catIdRef.current = catId;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catId]);

  return (
    <>
      <Modal.Title>Modal title</Modal.Title>
      <Modal.Content>
        <p className="text-red-600">{error && extractRtkError(error)}</p>
        {isLoading ? (
          "Loading.."
        ) : (
          <>
            <img src={data?.url} alt="" className="w-full" />
            <p className="mt-2">{data?.breeds?.[0]?.description}</p>
          </>
        )}
      </Modal.Content>
      <Modal.ButtonArea>
        <Button onClick={closeModal}>Got it, thanks!</Button>
      </Modal.ButtonArea>
    </>
  );
};

export default BreedInfoModal;
