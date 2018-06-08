let socket = io('http://ec2-54-93-171-91.eu-central-1.compute.amazonaws.com:5000');

let chess = new Chess();

let onDrop = function(source, target, piece, newPos, oldPos, orientation) {

    if(source !== target) {

        if(chess.move(source + target, {sloppy: true}) == null) return 'snapback';

        socket.connect();
        socket.emit('receive', {
            FEN: chess.fen(),
            ID_game: 0
        })
    }
};

let cfg = {
    draggable: true,
    position: 'start',
    onDrop: onDrop
};

let board = ChessBoard('board', cfg);

socket.on('makeMove', data => {
    socket.close();
    chess.move(data, {sloppy: true});
    board.move(data.substr(0,2) + '-' + data.substr(2,4));
});
