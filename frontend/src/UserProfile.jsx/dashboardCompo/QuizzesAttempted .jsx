import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";

const QuizzesAttempted = ({ quizzes }) => {
  // State for pagination
  const [page, setPage] = useState(0);
  const rowsPerPage = 3;

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the data to display on the current page
  const displayedQuizzes = quizzes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="!font-bold !text-black">Quiz Title</TableCell>
              <TableCell>Score</TableCell>
              <TableCell className="!font-bold !text-black">Total Questions</TableCell>
              <TableCell className="!font-bold !text-black">Accuracy</TableCell>
              <TableCell className="!font-bold !text-black">Date Completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedQuizzes.map((quiz) => (
              <TableRow key={quiz.quizId}>
                <TableCell>{quiz.quizTitle}</TableCell>
                <TableCell>{quiz.score}</TableCell>
                <TableCell>{quiz.totalQuestions}</TableCell>
                <TableCell>
                  {((quiz.score / quiz.totalQuestions) * 100).toFixed(2)}%
                </TableCell>
                <TableCell>
                  {new Date(quiz.completedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={quizzes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

export default QuizzesAttempted;
