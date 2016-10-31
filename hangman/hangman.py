# A basic The Hangman game in Python.

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
# Date: 2016-10-30
# Last update: 2016-10-31

import random
from sys import exit


# Choose a random word from a dictionary
def choose_a_word(lang):
    with open(lang + '.txt', 'r') as dictionary:
        lines = dictionary.readlines()

    return random.choice(lines).strip().upper()


# Start the game with a given player name and
# a dictionary choose by the player.
def game(player, lang):
    word = choose_a_word(lang)
    show_word = "_" * len(word)

    turn = 0
    guesses = ""

    hangman(turn, show_word, guesses)

    while True:
        move = raw_input("Insert your guess: ").upper()
        while move in guesses:
            move = raw_input("%s already guessed; try another letter: " % move).upper()
        guesses += move

        if move in word:
            print "You're guess is right!"
            for i in range(len(word)):
                if word[i] == move:
                    show_word = show_word[:i] + move + show_word[i + 1:]
            if show_word.find('_') == -1:
                hangman(turn, show_word, guesses)
                print "Congratulations %s, you win!" % player
                break
        else:
            turn += 1
            print "You're guess is wrong."
            if turn >= 6:
                hangman(turn, show_word, guesses)
                print "Sorry, you lost."
                break

        hangman(turn, show_word, guesses)


# Print The Hangman board, spaces for the word to guess
# and the guesses done so far.
def hangman(turn, word, guesses):
    print "      _____"
    print "      |   |"

    if turn >= 1:
        print "      O   |"
    else:
        print "          |"

    if turn >= 4:
        print "     /|\  |"
        print "      |   |"
    elif turn >= 3:
        print "     /|   |"
        print "      |   |"
    elif turn >= 2:
        print "      |   |"
        print "      |   |"
    else:
        print "          |"
        print "          |"

    if turn >= 6:
        print "     / \  |"
    elif turn >= 5:
        print "     /    |"
    else:
        print "          |"

    print "  ---------"
    print word, "[%d letters]" % len(word)
    print "Already guessed: " + guesses + "\n"


# Start the game asking the player for his/her name
# and let the player choose for the dictionary to play with.
def start():
    print "Hi! Welcome to The Hangman game!"
    player = raw_input("What's your name? ").strip().upper()

    print "Dictionary available: "
    print "1) English"
    print "2) Italian"
    dictionary = raw_input("Now %s, choose the dictionary you want to play with: " % player)

    if dictionary == '1':
        game(player, 'english')
    elif dictionary == '2':
        game(player, 'italian')
    else:
        print "Wrong choice, quitting..."
        exit(0)


start()
