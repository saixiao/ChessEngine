export default class EvalEngine {

    constructor () {
        // general chess piece values, p = 1, b,k = 3, r = 5, q = 9
        this.Pawn = 100;
        this.Knight = 300;
        this.Bishop = 335;
        this.Rook = 500;
        this.Queen = 900;
        this.King = 2500;

        // as the game becomes more open some pieces increase in value
        // pawns have the chance to promote, board is more open for bishops, rooks, and queens to threaten more space
        this.PawnEndGame = 125;
        this.KnightEndGame = 300;
        this.BishopEndGame = 360;
        this.RookEndGame = 520;
        this.QueenEndGame = 900;
    }
    
    // Pawn Maps
    WhitePawnEvalTable = [
        0,  0,  0,  0,  0,  0,  0,  0,
        50, 50, 50, 50, 50, 50, 50, 50,
        10, 10, 20, 40, 40, 20, 10, 10,
        5,  5, 10, 35, 35, 10,  5,  5,
        0,  0,  0, 35, 35,  0,  0,  0,
        0, 5, -10,  0,  0, -10, 5,  0,
        5, 10, 10,-20,-20, 10, 10,  5,
        0,  0,  0,  0,  0,  0,  0,  0,
    ]

    BlackPawnEvalTable = [
        0,  0,  0,  0,  0,  0,  0,  0,
        5, 10, 10,-20,-20, 10, 10,  5,
        5, -5,-10,  0,  0,-10, -5,  5,
        0,  0, 25, 20, 35,  0,  0,  0,
        5,  5, 10, 25, 25, 10,  5,  5,
        10, 10, 20, 30, 30, 20, 10, 10, 
        50, 50, 50, 50, 50, 50, 50, 50, 
        0,  0,  0,  0,  0,  0,  0,  0
    ]

    // Knight Maps
    WhiteKnightEvalTable = [
        -50,-40,-30,-30,-30,-30,-40,-50,
        -40,-20,  0,  0,  0,  0,-20,-40,
        -30,  0, 10, 15, 15, 10,  0,-30,
        -30,  5, 15, 20, 20, 15,  5,-30,
        -30,  0, 15, 20, 20, 15,  0,-30,
        -30,  5, 10, 15, 15, 10,  5,-30,
        -40,-20,  0,  5,  5,  0,-20,-40,
        -50,  0,-40,-40,-40,-40,  0,-50,
    ]

    BlackKnightEvalTable = [
        -50,  0,-40,-50,-50,-40,  0,-50,
        -40,-20,  0,  5,  5,  0,-20,-40,
        -30,  5, 10, 15, 15, 10,  5,-30,
        -30,  0, 15, 20, 20, 15,  0,-30,
        -30,  5, 15, 20, 20, 15,  5,-30,
        -30,  0, 10, 15, 15, 10,  0,-30,
        -40,-20,  0,  0,  0,  0,-20,-40,
        -50,-40,-30,-30,-30,-30,-40,-50,
    ]

    // Bishop Maps
    WhiteBishopEvalTable = [
        -20,-10,-10,-10,-10,-10,-10,-20,
        -10,  0,  0,  0,  0,  0,  0,-10,
        -10,  0,  5, 10, 10,  5,  0,-10,
        -10,  5,  5, 10, 10,  5,  5,-10,
        -10,  0, 10, 10, 10, 10,  0,-10,
        -10, 10, 10, 10, 10, 10, 10,-10,
        -10,  5,  0,  0,  0,  0,  5,-10,
        -20,-10,  0,-10,-10,  0,-10,-20,
    ]

    BlackBishopEvalTable = [
        -20,-10,  0,-10,-10,  0,-10,-20,
        -10,  5,  0,  0,  0,  0,  5,-10,
        -10, 10, 10, 10, 10, 10, 10,-10,
        -10,  0, 10, 10, 10, 10,  0,-10,
        -10,  5,  5, 10, 10,  5,  5,-10,
        -10,  0,  5, 10, 10,  5,  0,-10,
        -10,  0,  0,  0,  0,  0,  0,-10,
        -20,-10,-10,-10,-10,-10,-10,-20,
    ]

    // Rook Maps
    WhiteRookEvalTable = [
        0,  0,  0,  0,  0,  0,  0,  0,
        5, 10, 10, 10, 10, 10, 10,  5,
        -5,  0,  0,  0,  0,  0,  0, -5,
        -5,  0,  0,  0,  0,  0,  0, -5,
        -5,  0,  0,  0,  0,  0,  0, -5,
        -5,  0,  0,  0,  0,  0,  0, -5,
        -5,  0,  0,  0,  0,  0,  0, -5,
         0,  0,  0,  0,  0,  0,  0,  0,
    ]

    BlackRookEvalTable = [
         0,  0,  0,  0,  0,  0,  0,  0,
        -5,  0,  0,  0,  0,  0,  0, -5,
        -5,  0,  0,  0,  0,  0,  0, -5,
        -5,  0,  0,  0,  0,  0,  0, -5,
        -5,  0,  0,  0,  0,  0,  0, -5,
        -5,  0,  0,  0,  0,  0,  0, -5,
         5, 10, 10, 10, 10, 10, 10,  5,
         0,  0,  0,  0,  0,  0,  0,  0,
    ]

    // Queen Maps
    WhiteQueenEvalTable = [
        20,-10,-10, -5, -5,-10,-10,-20,
        -10,  0,  0,  0,  0,  0,  0,-10,
        -10,  0,  5,  5,  5,  5,  0,-10,
        -5,  0,  5,  5,  5,  5,  0, -5,
        0,  0,  5,  5,  5,  5,  0, -5,
        -10,  5,  5,  5,  5,  5,  0,-10,
        -10,  0,  5,  0,  0,  0,  0,-10,
        -20,-10,-10, -5, -5,-10,-10,-20,
    ]

    BlackQueenEvalTable = [
        -20,-10,-10, -5, -5,-10,-10,-20,
        -10,  0,  5,  0,  0,  0,  0,-10,
        -10,  5,  5,  5,  5,  5,  0,-10,
        0,  0,  5,  5,  5,  5,  0, -5,
        -5,  0,  5,  5,  5,  5,  0, -5,
        -10,  0,  5,  5,  5,  5,  0,-10,
        -10,  0,  0,  0,  0,  0,  0,-10,
        -20,-10,-10, -5, -5,-10,-10,-20,
    ]

    // King Maps
    WhiteKingEarlyGameEvalTable = [
        30,-40,-40,-50,-50,-40,-40,-30,
        -30,-40,-40,-50,-50,-40,-40,-30,
        -30,-40,-40,-50,-50,-40,-40,-30,
        -30,-40,-40,-50,-50,-40,-40,-30,
        -20,-30,-30,-40,-40,-30,-30,-20,
        -10,-20,-20,-20,-20,-20,-20,-10,
        20, 20,  0,  0,  0,  0, 20, 20,
        20, 30, 10,  0,  0, 10, 30, 20,
    ]

    WhiteKingMidGameEvalTable = [
        -30,-40,-40,-50,-50,-40,-40,-30,
        -30,-40,-40,-50,-50,-40,-40,-30,
        -30,-40,-40,-50,-50,-40,-40,-30,
        -30,-40,-40,-50,-50,-40,-40,-30,
        -20,-30,-30,-40,-40,-30,-30,-20,
        -10,-20,-20,-20,-20,-20,-20,-10,
        20, 20,  0,  0,  0,  0, 20, 20,
        20, 30, 10,  0,  0, 10, 30, 20,
    ]

    WhiteKingEndGameEvalTable = [
        -50,-40,-30,-20,-20,-30,-40,-50,
        -30,-20,-10,  0,  0,-10,-20,-30,
        -30,-10, 20, 30, 30, 20,-10,-30,
        -30,-10, 30, 40, 40, 30,-10,-30,
        -30,-10, 30, 40, 40, 30,-10,-30,
        -30,-10, 20, 30, 30, 20,-10,-30,
        -30,-30,  0,  0,  0,  0,-30,-30,
        -50,-30,-30,-30,-30,-30,-30,-50,
    ]

    BlackKingEarlyGameEvalTable = [
        10, 20, 30,  0,  0, 10, 30, 10,
        20, 20,  0,  0,  0,  0, 20, 20,
        -10,-20,-20,-20,-20,-20,-20,-10,
        -20,-30,-30,-40,-40,-30,-30,-20,
        -30,-40,-40,-50,-50,-40,-40,-30,
        -30,-40,-40,-50,-50,-40,-40,-30,
        -30,-40,-40,-50,-50,-40,-40,-30,
        -30,-40,-40,-50,-50,-40,-40,-30,
    ]

    BlackKingMidGameEvalTable = [
        20, 30, 10,  0,  0, 10, 30, 20,
        20, 20,  0,  0,  0,  0, 20, 20,
        -10,-20,-20,-20,-20,-20,-20,-10,
        -20,-30,-30,-40,-40,-30,-30,-20,
        -30,-40,-40,-50,-50,-40,-40,-30,
        -30,-40,-40,-50,-50,-40,-40,-30,
        -30,-40,-40,-50,-50,-40,-40,-30,
        -30,-40,-40,-50,-50,-40,-40,-30,
    ]

    BlackKingEndGameEvalTable = [
        -50,-30,-30,-30,-30,-30,-30,-50,
        -30,-30,  0,  0,  0,  0,-30,-30,
        -30,-10, 20, 30, 30, 20,-10,-30,
        -30,-10, 30, 40, 40, 30,-10,-30,
        -30,-10, 30, 40, 40, 30,-10,-30,
        -30,-10, 20, 30, 30, 20,-10,-30,
        -30,-20,-10,  0,  0,-10,-20,-30,
        -50,-40,-30,-20,-20,-30,-40,-50,
    ]

    stripAscii(asciiboard) {
        return asciiboard.replace(/ /g, "").slice(0, 150).replace(/[-+1-8|\n]/g, "").split("");
    }

    // TODO: improve game state detector, better definitions for early, mid and end game
    // Looking at some chess website statistics, games usually last around 60-80 moves, with midgame around move 15-20 and endgame after 50
    evalPosition(asciiboard, turn) {
        let board = this.stripAscii(asciiboard);
        let blackScore = 0;
        let whiteScore = 0;
        for (let i = 0; i < board.length; i++) {
            switch (board[i]) {
                // black scores
                case "p":
                    if (turn < 50) {
                        blackScore += this.Pawn + this.BlackPawnEvalTable[i];
                    } else {
                        blackScore += this.PawnEndGame + this.BlackPawnEvalTable[i];
                    }
                    break;
                case "n":
                    if (turn < 50) {
                        blackScore += this.Knight + this.BlackKnightEvalTable[i];
                    } else {
                        blackScore += this.KnightEndGame + this.BlackKnightEvalTable[i];
                    }
                    break;
                case "b":
                    if (turn < 50) {
                        blackScore += this.Bishop + this.BlackBishopEvalTable[i];
                    } else {
                        blackScore += this.BishopEndGame + this.BlackBishopEvalTable[i];
                    }
                    break;
                case "r":
                    if (turn < 50) {
                        blackScore += this.Rook + this.BlackRookEvalTable[i];
                    } else {
                        blackScore += this.RookEndGame + this.BlackRookEvalTable[i];
                    }
                    break;
                case "q":
                    if (turn < 50) {
                        blackScore += this.Queen + this.BlackQueenEvalTable[i];
                    } else {
                        blackScore += this.QueenEndGame + this.BlackQueenEvalTable[i];
                    }
                    break;
                case "k":
                    if (turn < 20) {
                        blackScore += this.King + this.BlackKingEarlyGameEvalTable[i];
                    } else if (turn < 50) {
                        blackScore += this.King + this.BlackKingMidGameEvalTable[i];
                    } else {
                        blackScore += this.King + this.BlackKingEndGameEvalTable[i];
                    }
                    break;
                // white scores
                case "P":
                    if (turn < 50) {
                        whiteScore += this.Pawn + this.WhitePawnEvalTable[i];
                    } else {
                        whiteScore += this.PawnEndGame + this.WhitePawnEvalTable[i];
                    }
                    break;
                case "N":
                    if (turn < 50) {
                        whiteScore += this.Knight + this.WhiteKnightEvalTable[i];
                    } else {
                        whiteScore += this.KnightEndGame + this.WhiteKnightEvalTable[i];
                    }
                    break;
                case "B":
                    if (turn < 50) {
                        whiteScore += this.Bishop + this.WhiteBishopEvalTable[i];
                    } else {
                        whiteScore += this.BishopEndGame + this.WhiteBishopEvalTable[i];
                    }
                    break;
                case "R":
                    if (turn < 50) {
                        whiteScore += this.Rook + this.WhiteRookEvalTable[i];
                    } else {
                        whiteScore += this.RookEndGame + this.WhiteRookEvalTable[i];
                    }
                    break;
                case "Q":
                    if (turn < 50) {
                        whiteScore += this.Queen + this.WhiteQueenEvalTable[i];
                    } else {
                        whiteScore += this.QueenEndGame + this.WhiteQueenEvalTable[i];
                    }
                    break;
                case "K":
                    if (turn < 20) {
                        whiteScore += this.King + this.WhiteKingEarlyGameEvalTable[i];
                    } else if (turn < 50) {
                        whiteScore += this.King + this.WhiteKingMidGameEvalTable[i];
                    } else {
                        whiteScore += this.King + this.WhiteKingEndGameEvalTable[i];
                    }
                    break;
                default:
                    break;
            }
        }

        return whiteScore - blackScore;
    }

    // TODO: add setters for pawn, bishop, knight, rook values since they may change
    // certain pieces have synergy, ie double bishop, connected rooks, linked pawns
}