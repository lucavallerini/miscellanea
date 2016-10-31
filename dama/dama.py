# A basic Italian draughts in Python

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
# Date: 2016-10-31
# Last update: 2016-10-31


# Draw the board game
from array import array


def draw_board_game(values):
    print "   1   2   3   4   5   6   7   8"  # columns coordinates
    for i in range(8):
        print "  " + " ---" * 8

        row = str(i + 1) + " "  # lines coordinates
        for j in range(8):
            if j == 7:
                row += "| " + values[2 * i + j] + " |"
            else:
                row += "| " + values[2 * i + j] + " "

        print row

    print "  " + " ---" * 8


draw_board_game(array('c', ['.'] * 64))
