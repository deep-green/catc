let socket = io('http://ec2-54-93-171-91.eu-central-1.compute.amazonaws.com:5000');

let wTurns = 1, bTurns = 0, active_player = 'w';

let onChange = function (oldPos, newPos) {

    active_player = (active_player === 'w') ? 'b':'w';
    if(wTurns > bTurns) {
        bTurns++;
    } else {
        wTurns++;
    }

    let fen = ChessBoard.objToFen(newPos) + ' ' + active_player + ' KQkq - ' + bTurns + ' ' + wTurns;
    console.log(fen);
    socket.emit('receive', {
        FEN: fen,
        ID_game: 2
    })
};

socket.on('makeMove', data => {
    board.move(data.substr(0,2) + '-' + data.substr(2,4));
});

let cfg = {
    draggable: true,
    position: 'start',
    onChange: onChange
};

let board = ChessBoard('board', cfg);
