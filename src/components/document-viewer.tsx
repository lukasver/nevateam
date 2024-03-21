'use client';
import React, { MouseEvent, SyntheticEvent, useState } from 'react';

import {
  Box,
  Fade,
  IconButton,
  Select,
  MenuItem,
  Modal,
  SelectChangeEvent,
} from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useMediaQuery } from '@/lib/client/hooks';

import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface TeaserModalProps {
  open: boolean;
  onClose: (e: unknown) => void;
  id: string | null;
}

const TeaserModal = ({ id, open, onClose }: TeaserModalProps) => {
  return id ? (
    <Modal sx={{ top: 0 }} open={!!open} onClose={onClose}>
      <PDFViewer blob={`${process.env.NEXT_PUBLIC_DOMAIN}/${id}`} />
    </Modal>
  ) : null;
};

const PDFViewer = ({ blob }: { blob: BlobPart }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [pageSelectorOpen, setPageSelectorOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery('sm');
  const isWideDesktop = useMediaQuery('xl', 'up');

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handlePageChange = (event: SelectChangeEvent) => {
    const selectedPage = event.target.value;
    setPageNumber(Number(selectedPage));
    setPageSelectorOpen(false);
  };

  const handlePage = (e: SyntheticEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    changePage(name === 'next' ? 1 : -1);
  };

  const showPagination = Boolean(anchorEl);

  return (
    <Box
      sx={{
        width: 'fit-content',
        position: 'relative',
        marginInline: 'auto',
        aspectRatio: isMobile ? '1' : undefined,
      }}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <style>{pdfStyles}</style>
      <Document file={blob as string} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          height={300}
          scale={isWideDesktop ? 4 : 2}
        />
      </Document>
      <Pagination
        pageNumber={pageNumber}
        numPages={numPages}
        handlePage={handlePage}
        handlePageChange={handlePageChange}
        pageSelectorOpen={pageSelectorOpen}
        setPageSelectorOpen={setPageSelectorOpen}
        isMobile={isMobile}
        showPagination={showPagination}
      />
    </Box>
  );
};

const pdfStyles = `
  .react-pdf__Document {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .react-pdf__Page {
    max-width: calc(100% - 2em);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
    margin: 1em;
    background-color: transparent !important
  }

  .react-pdf__Page canvas {
     max-width: 100%;
     aspect-ratio: 1
  }


  .react-pdf__message {
    padding: 20px;
    color: white;
  }
`;

const Pagination: React.FC<{
  isMobile: boolean;
  showPagination: boolean;
  handlePage: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handlePageChange: (event: SelectChangeEvent) => void;
  pageNumber: number;
  numPages: number | null;
  pageSelectorOpen: boolean;
  setPageSelectorOpen: (open: boolean) => void;
}> = ({
  isMobile,
  showPagination,
  handlePage,
  handlePageChange,
  pageNumber,
  numPages,
  pageSelectorOpen,
  setPageSelectorOpen,
}) => {
  return (
    <Fade in={isMobile ? true : showPagination}>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: ({ palette }) => palette.common.lightGray,
          borderRadius: '10px',
          position: 'absolute',
          bottom: -20,
          left: '50%',
          transform: ' translate(-50%)',
          zIndex: 2,
          alignItems: 'center',
        }}
      >
        <IconButton
          name='previous'
          onClick={(e) => handlePage(e)}
          disabled={pageNumber === 1}
        >
          <ChevronLeftIcon
            sx={{ color: pageNumber === 1 ? 'grey' : 'black' }}
          />
        </IconButton>
        <Select
          sx={{
            color: 'black',
            '&>svg': { color: 'black' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: ({ palette }) => palette.common.lightGray,
            },
          }}
          value={String(pageNumber)}
          onChange={handlePageChange}
          open={pageSelectorOpen}
          onOpen={() => setPageSelectorOpen(true)}
          onClose={() => setPageSelectorOpen(false)}
        >
          {/* @ts-expect-error wontfix */}
          {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
            // @ts-expect-error wontfix
            <MenuItem value={page} key={page}>
              Page {page}
            </MenuItem>
          ))}
        </Select>
        <IconButton
          name='next'
          onClick={(e) => handlePage(e)}
          disabled={pageNumber === numPages}
        >
          <ChevronRightIcon
            sx={{ color: pageNumber === numPages ? 'grey' : 'black' }}
          />
        </IconButton>
      </Box>
    </Fade>
  );
};

export default TeaserModal;
