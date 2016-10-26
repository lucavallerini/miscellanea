# A basic Tic Tac Toe game in Python.
 
# This code is licensed under the MIT License.
#
# MIT License
# 
# Copyright (c) 2016 Luca Vallerini
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#
# Author: Luca Vallerini
# E-mail: lucavall90@gmail.com
#
# Date: 2016-10-22
# Last update: 2016-10-26

import numpy as np

# Draw the board game
def draw_board_game(values):
    size = len(values)
    
    for i in range(len(values)):
        print " ---" * size
        
        row = ""
        for j in range(size):
            if j == (size - 1):
                row += "| " + str(int(values[i, j])) + " |"
            else:
                row += "| " + str(int(values[i, j])) + " "
            
        print row
        
    print " ---" * size

# Check if someone won
def winner(game):
    size = len(game)
    
    for i in range(size):        
        # check winner by row
        tmp_row = game[i, 0]
        winner = True        
        for j in range(size):
            if game[i, j] == tmp_row and winner and j == size - 1:
                if tmp_row > 0:
                    return tmp_row
            elif game[i, j] == tmp_row and winner:
                winner = True
            else:
                winner = False
        
        # check winner by column
        tmp_col = game[0, i]
        winner = True
        for j in range(size):    
            if game[j, i] == tmp_col and winner and j == size - 1:
                if tmp_col > 0:
                    return tmp_col
            elif game[j, i] == tmp_col and winner:
                winner = True
            else:
                winner = False
    
    # check winner on diagonal
    tmp_diag = game[0, 0]
    winner = True
    for i in range(size):
        if game[i, i] == tmp_diag and winner and i == size - 1:
            if tmp_diag > 0:
                return tmp_diag
        elif game[i, i] == tmp_diag and winner:
            winner = True
        else:
            winner = False
        
    # check winner on anti diagonal
    tmp_adiag = game[0, size - 1]    
    winner = True
    i, j = 0, size-1
    while winner:
        if game[i,j] == tmp_adiag and winner and i == size - 1:
            winner = False
            if tmp_adiag > 0:
                return tmp_adiag
        elif game[i,j] == tmp_adiag and winner:
            winner = True
        else:
            winner = False
        
        i += 1
        j -= 1
        
    return 0  # no one won

def game_play(table_size):
    turn = 1
    winning = False
    table = np.zeros((table_size, table_size))
    
    # Draw empty board
    draw_board_game(table)
    
    # Begin the game
    while (not winning and turn <= 9):
        print "Turn %d" % (turn)
        
        # Player 1 move
        move(table, 1)
        
        # Check if player 1 won: if so, terminate
        # the game, otherwise go on with player 2 turn.
        k = winner(table)
        if k > 0:
            winning = True
            print "Game over. Player %d won!" % k
            break
        
        # Player 2 move
        move(table, 2)
        
        # Check if player 2 won or if there are no more
        # turns: if so, terminate the game, otherwise 
        # move to the next turn.
        k = winner(table)
        if k > 0:
            winning = True
            print "Game over. Player %d won!" % k
            break
        elif k == 0 and turn == 9:
            print "Game over. No one won!"
            break
        else:
            turn += 1

# Check if the move is valid or not
def isMoveValid(t, m):
    if int(m[0]) > 0 and int(m[0]) <= len(t) and int(m[1]) > 0 and int(m[1]) <= len(t) and t[int(m[0])-1, int(m[1])-1] == 0:
        return True
    else:
        return False 
     
# Insert your move: if the move is valid, insert it in the
# board and redraw it, otherwise ask for a valid move.   
def move(table, player):
        move = raw_input("Player %d, your move (e.g. 1 3): " % player).split()
        while (not isMoveValid(table, move)):
            move = raw_input("Cell already taken or wrong coordinates, try again: ").split()
            
        table[int(move[0])-1, int(move[1])-1] = player 
        
        draw_board_game(table)


print "Welcome on Tic Tac Toe game!"
board_size = int(input("Insert the size of the board: "))
print "OK, let the game begin!"
game_play(board_size)
