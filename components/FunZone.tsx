import React from 'react';
import Section from './Section';
import TicTacToe from './TicTacToe';

const FunZone: React.FC = () => {
  return (
    <Section title="Fun Zone">
      <div className="flex flex-col items-center">
        <p className="text-slate-400 text-lg mb-8 text-center">
          Take a break and play a game of Tic-Tac-Toe!
        </p>
        <TicTacToe />
      </div>
    </Section>
  );
};

export default FunZone;