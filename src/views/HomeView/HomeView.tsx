import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useGetRandomCatsQuery } from "api";
import { selectLoadDataOnInit } from "store/settingsSlice";
import { extractRtkError, uniqBy } from "utils";
import { DisplayError, ImageGrid, Loading, Modal } from "components";
import BreedInfoModal from "./BreedInfoModal";
import debounce from "utils/debounce";
import { CatListItem } from "types";

let page = 0;
let pageLoaded = 0;
let pageSize = 0;

function HomeView() {
  let [modalOpen, setModalOpen] = useState(false);
  let [pageState, setPageState] = useState(0);
  let [allData, setAllData] = useState<Array<CatListItem>>([]);

  const setPage = (newPage: number) => {
    page = newPage;
    setPageState(newPage);
  };

  const { catId } = useParams();
  const navigate = useNavigate();
  const {
    data,
    error,
    isLoading,
    refetch: getCats,
  } = useGetRandomCatsQuery(
    { page: pageState },
    { refetchOnMountOrArgChange: true },
  );

  const loadDataOnInit = useSelector(selectLoadDataOnInit);

  function closeModal() {
    navigate("/");
    setModalOpen(false);
  }

  useEffect(() => {
    if (loadDataOnInit) getCats();
    page = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      data &&
      (pageLoaded < pageState || (pageLoaded === 0 && pageState === 0))
    ) {
      let allTasksUnique = [];
      // Here because the images are comming random there is a chance the same id will be rendered multiple
      // times so I've used a unique function to clean it.
      allTasksUnique = uniqBy([...allData, ...data], "id");
      setAllData(allTasksUnique);
      pageLoaded = page;

      // Update total page height
      setTimeout(() => {
        const body = document.body;
        const html = document.documentElement;

        const height = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight,
        );
        pageSize = height;
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Infinite load
  useEffect(() => {
    const handleScroll = debounce(() => {
      const currentScrollPosition = window.scrollY;
      const remainingScrollHeight =
        pageSize - window.screen.height - currentScrollPosition;

      if (remainingScrollHeight <= 500 && pageLoaded === page) {
        setPage(page + 1);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (catId) setModalOpen(true);
    else setModalOpen(false);
  }, [catId]);

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
    <div>
      <h1 className="mb-4 text-3xl font-bold text-rose-400">
        Hello to cat nerds!
      </h1>
      <p className="mb-2">Click on an image below to get more info.</p>
      <Modal onClose={closeModal} open={modalOpen} width="max-w-4xl">
        <BreedInfoModal catId={catId ?? ""} closeModal={closeModal} />
      </Modal>
      <ImageGrid items={allData} />
    </div>
  );
}

export default HomeView;
