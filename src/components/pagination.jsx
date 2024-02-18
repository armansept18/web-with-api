/* eslint-disable react/prop-types */

import { Box, Button } from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  return (
    <Box mt={4} display="flex" justifyContent="center" alignItems="center">
      <Button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        mr={2}
      >
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        ml={2}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
