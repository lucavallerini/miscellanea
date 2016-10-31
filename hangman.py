import random
from sys import exit


def choose_a_word(lang):
    with open(lang + '.txt', 'r') as dictionary:
        lines = dictionary.readlines()

    return random.choice(lines).strip().upper()


def game(player, lang):
    word = choose_a_word(lang)  # italian, english
    show_word = "_" * len(word)
    print word

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
