  import React, { useState } from "react";
  import {
    ChakraProvider,
    Box,
    Button,
    Text,
    VStack,
    extendTheme,
  } from "@chakra-ui/react";

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "gray.100",
        },
      },
    },
  });

  function App() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    function selectSquare(square) {
      if (calculateWinner(squares) || squares[square]) {
        return;
      }
      const nextSquares = squares.slice();
      nextSquares[square] = xIsNext ? "X" : "O";
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
    }

    function restart() {
      setSquares(Array(9).fill(null));
      setXIsNext(true);
    }

    function renderSquare(i) {
      const isX = squares[i] === "X";
      const isO = squares[i] === "O";
      const buttonStyle = {
        size: 'lg',
        width: '75px',
        height: '75px',
        variant: 'outline',
        borderColor: 'gray.150',
        _hover: {
          borderColor: 'gray.800',
        },
        color: 'gray.800',
        bg: isX ? 'blue.500' : isO ? 'red.500' : 'gray.100',
      };
      return (
        <Button
          {...buttonStyle}
          onClick={() => selectSquare(i)}
          isDisabled={squares[i] || calculateWinner(squares)}
        >
          {squares[i]}
        </Button>
      );
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else if (squares.every(Boolean)) {
      status = "Scratch: Cat's game";
    } else {
      status = `Next player: ${xIsNext ? "X" : "O"}`;
    }

    return (
      <ChakraProvider theme={theme}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            {status}
          </Text>
          <VStack spacing={1} alignItems="center">
            <Box display="flex" flexDirection="row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </Box>
            <Box display="flex" flexDirection="row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </Box>
            <Box display="flex" flexDirection="row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </Box>
          </VStack>
          <Button onClick={restart} mt={6} colorScheme="teal">
            Restart
          </Button>
        </Box>
      </ChakraProvider>
    );
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  export default App;
