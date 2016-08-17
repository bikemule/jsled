(function() {
    // Performance is a microsecond resolution timer, but doesn't exist on iOS
    if("performance" in window == false){
        var performance = Date;    
    }
})(); // This is because iOS lacks performance, not sure about Android

var DEFAULT_PIXELS_PER_LED = 16;
var DEFAULT_CHAR_WIDTH = 5;       // in LEDs, not pixels
var DEFAULT_CHAR_HEIGHT = 7;      // LEDs, not pixels

var alphabet = {
    ' ': [0x00, 0x00, 0x00], // ' '
    '!': [0x00, 0x00, 0xfa, 0x00, 0x00], // !
    '"': [0x00, 0xe0, 0x00, 0xe0, 0x00], // "
    '#': [0x28, 0xfe, 0x28, 0xfe, 0x28], // #
    '$': [0x24, 0x54, 0xfe, 0x54, 0x48], // $
    '%': [0xc4, 0xc8, 0x10, 0x26, 0x46], // %
    '&': [0x6c, 0x92, 0xaa, 0x44, 0x0a], // &
    '\'': [0x00, 0xa0, 0xc0, 0x00, 0x00], // '
    '(': [0x00, 0x38, 0x44, 0x82, 0x00], // (
    ')': [0x00, 0x82, 0x44, 0x38, 0x00], // )
    '*': [0x10, 0x54, 0x38, 0x54, 0x10], // *
    '+': [0x10, 0x10, 0x7c, 0x10, 0x10], // +
    ',': [0x00, 0x0a, 0x0c, 0x00, 0x00], // ,
    '-': [0x10, 0x10, 0x10, 0x10, 0x10], // -
    '.': [0x00, 0x06, 0x06, 0x00, 0x00], // .
    '/': [0x04, 0x08, 0x10, 0x20, 0x40], // /
    '0': [0x7c, 0x8a, 0x92, 0xa2, 0x7c], // 0
    '1': [0x00, 0x42, 0xfe, 0x02, 0x00], // 1
    '2': [0x42, 0x86, 0x8a, 0x92, 0x62], // 2
    '3': [0x84, 0x82, 0xa2, 0xd2, 0x8c], // 3
    '4': [0x18, 0x28, 0x48, 0xfe, 0x08], // 4
    '5': [0xe4, 0xa2, 0xa2, 0xa2, 0x9c], // 5
    '6': [0x3c, 0x52, 0x92, 0x92, 0x0c], // 6
    '7': [0x80, 0x8e, 0x90, 0xa0, 0xc0], // 7
    '8': [0x6c, 0x92, 0x92, 0x92, 0x6c], // 8
    '9': [0x60, 0x92, 0x92, 0x94, 0x78], // 9
    ':': [0x00, 0x6c, 0x6c, 0x00, 0x00], // :
    ';': [0x00, 0x6a, 0x6c, 0x00, 0x00], // ;
    '<': [0x00, 0x10, 0x28, 0x44, 0x82], // <
    '=': [0x28, 0x28, 0x28, 0x28, 0x28], // =
    '>': [0x82, 0x44, 0x28, 0x10, 0x00], // >
    '?': [0x40, 0x80, 0x8a, 0x90, 0x60], // ?
    '@': [0x4c, 0x92, 0x9e, 0x82, 0x7c], // @
    'A': [0x7e, 0x88, 0x88, 0x88, 0x7e], // A
    'B': [0xfe, 0x92, 0x92, 0x92, 0x6c], // B
    'C': [0x7c, 0x82, 0x82, 0x82, 0x44], // C
    'D': [0xfe, 0x82, 0x82, 0x44, 0x38], // D
    'E': [0xfe, 0x92, 0x92, 0x92, 0x82], // E
    'F': [0xfe, 0x90, 0x90, 0x80, 0x80], // F
    'G': [0x7c, 0x82, 0x82, 0x8a, 0x4c], // G
    'H': [0xfe, 0x10, 0x10, 0x10, 0xfe], // H
    'I': [0x00, 0x82, 0xfe, 0x82, 0x00], // I
    'J': [0x04, 0x02, 0x82, 0xfc, 0x80], // J
    'K': [0xfe, 0x10, 0x28, 0x44, 0x82], // K
    'L': [0xfe, 0x02, 0x02, 0x02, 0x02], // L
    'M': [0xfe, 0x40, 0x20, 0x40, 0xfe], // M
    'N': [0xfe, 0x20, 0x10, 0x08, 0xfe], // N
    'O': [0x7c, 0x82, 0x82, 0x82, 0x7c], // O
    'P': [0xfe, 0x90, 0x90, 0x90, 0x60], // P
    'Q': [0x7c, 0x82, 0x8a, 0x84, 0x7a], // Q
    'R': [0xfe, 0x90, 0x98, 0x94, 0x62], // R
    'S': [0x62, 0x92, 0x92, 0x92, 0x8c], // S
    'T': [0x80, 0x80, 0xfe, 0x80, 0x80], // T
    'U': [0xfc, 0x02, 0x02, 0x02, 0xfc], // U
    'V': [0xf8, 0x04, 0x02, 0x04, 0xf8], // V
    'W': [0xfe, 0x04, 0x18, 0x04, 0xfe], // W
    'X': [0xc6, 0x28, 0x10, 0x28, 0xc6], // X
    'Y': [0xc0, 0x20, 0x1e, 0x20, 0xc0], // Y
    'Z': [0x86, 0x8a, 0x92, 0xa2, 0xc2], // Z
    '[': [0x00, 0x00, 0xfe, 0x82, 0x82], // [
    '\\': [0x40, 0x20, 0x10, 0x08, 0x04], // "\"
    ']': [0x82, 0x82, 0xfe, 0x00, 0x00], // ]
    '^': [0x20, 0x40, 0x80, 0x40, 0x20], // ^
    '_': [0x02, 0x02, 0x02, 0x02, 0x02], // _
    '`': [0x00, 0x80, 0x40, 0x20, 0x00], // `
    'a': [0x04, 0x2a, 0x2a, 0x2a, 0x1e], // a
    'b': [0xfe, 0x12, 0x22, 0x22, 0x1c], // b
    'c': [0x1c, 0x22, 0x22, 0x22, 0x04], // c
    'd': [0x1c, 0x22, 0x22, 0x12, 0xfe], // d
    'e': [0x1c, 0x2a, 0x2a, 0x2a, 0x18], // e
    'f': [0x10, 0x7e, 0x90, 0x80, 0x40], // f
    'g': [0x10, 0x28, 0x2a, 0x2a, 0x3c], // g
    'h': [0xfe, 0x10, 0x20, 0x20, 0x1e], // h
    'i': [0x00, 0x22, 0xbe, 0x02, 0x00], // i
    'j': [0x04, 0x02, 0x22, 0xbc, 0x00], // j
    'k': [0x00, 0xfe, 0x08, 0x14, 0x22], // k
    'l': [0x00, 0x82, 0xfe, 0x02, 0x00], // l
    'm': [0x3e, 0x20, 0x18, 0x20, 0x1e], // m
    'n': [0x3e, 0x10, 0x20, 0x20, 0x1e], // n
    'o': [0x1c, 0x22, 0x22, 0x22, 0x1c], // o
    'p': [0x3e, 0x28, 0x28, 0x28, 0x10], // p
    'q': [0x10, 0x28, 0x28, 0x18, 0x3e], // q
    'r': [0x3e, 0x10, 0x20, 0x20, 0x10], // r
    's': [0x12, 0x2a, 0x2a, 0x2a, 0x04], // s
    't': [0x20, 0xfc, 0x22, 0x02, 0x04], // t
    'u': [0x3c, 0x02, 0x02, 0x04, 0x3e], // u
    'v': [0x38, 0x04, 0x02, 0x04, 0x38], // v
    'w': [0x3c, 0x02, 0x0c, 0x02, 0x3c], // w
    'x': [0x22, 0x14, 0x08, 0x14, 0x22], // x
    'y': [0x30, 0x0a, 0x0a, 0x0a, 0x3c], // y
    'z': [0x22, 0x26, 0x2a, 0x32, 0x22], // z
    '{': [0x10, 0x6c, 0x82], // [
    '|': [0x00, 0x00, 0xfe, 0x00, 0x00], // |
    '}': [0x82, 0x6c, 0x10], // ]
    '~': [0x40, 0x80, 0xc0, 0x40, 0x80] // ~

};

function get_bit_at_position(number, n) {
    // return the nth bit of the number, 0-based
    var mask = 1;
    mask = mask << n;

    return number & mask; // true if nth bit is 1
}

function random_hex_color() {
    // return a random hex string
    return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
}

function LEDScreen(cols, rows, pixels_per_led) {
    // Sets up a simulated LED screen in HTML

    // Check for undefined cols & rows
    if (cols === undefined || isNaN(cols) || rows === undefined || isNaN(rows)) {
        cols = 40;
        rows = 7;
        console.log("Automatically set the cols and rows of pixels");
    }
    
    this.cols = cols;
    this.rows = rows;
    this.total_leds = this.rows * this.cols;

    if ((pixels_per_led !== undefined && !isNaN(pixels_per_led)) ||
        isNaN(parseInt(pixels_per_led, 10))) {
        this.led_pixel_width = DEFAULT_PIXELS_PER_LED;
        this.led_pixel_height = DEFAULT_PIXELS_PER_LED;
    } else {
        this.led_pixel_height = pixels_per_led;
        this.led_pixel_width = pixels_per_led;
    }
    
    // Totally unnecessary eye candy
    this.led_glow = 5;
    
    // width of the font's characters, in LEDs
    this.char_width = DEFAULT_CHAR_WIDTH;
    this.char_height = DEFAULT_CHAR_HEIGHT;
    
    // Scrolling vars    
    this.scroll_pos_x = 0;                     // Keeps track of scrolling
    this.scroll_pos_y = 0;
    this.scroll_wrap_y = true;
    this.scroll_direction = "----";
    //this.scroll_direction = {'up': 0, 'left': 0, 'right': 0, 'left': 0};
    this.scroll_speed_x = this.led_pixel_width * 3;  // Scroll 1 LED per clock tick
    this.scroll_speed_y = this.led_pixel_width;

    // performance doesn't exist on all platforms. See polyfill at start
    this.start_time = performance.now();
    
    this.setup_canvas_array = function() {
        // Main canvas to draw to
        this.canvas = document.body.appendChild(document.createElement("canvas"));
        this.canvas.id = "led-canvas";
        this.canvas.width = this.cols * this.led_pixel_width;
        this.canvas.height = this.rows * this.led_pixel_width;
        
        // Drawing context for main canvas
        this.context = this.canvas.getContext("2d");
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Non-visible canvas & context to draw text on
        // Then we copy this to the main canvas
        this.text_canvas = document.createElement("canvas");
        this.text_canvas.width = this.canvas.width;
        this.text_canvas.height = this.canvas.height;
        this.text_ctx = this.text_canvas.getContext("2d");
    };
    
    this.setup_canvas_array();

    this.setLEDXY = function (x, y, color) {
        // Set LEDs as if they were a normal display.
        if (!color) {
            color = "#0f0";
        }
        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }
       
        // Canvas part
        this.drawLED(x, y, color, this.text_ctx);
    };
    
    this.drawLED = function(x, y, color, ctx) {
        // Draws an LED on the context passed in
        // TODO: FIX: Had to reverse x & y because I was stupid
        
        var r = this.led_pixel_width / 2;  // Radius
        
        var led_midpoint_x = (y * this.led_pixel_width) + this.led_pixel_width / 2;
        var led_midpoint_y = (x * this.led_pixel_width) + this.led_pixel_width / 2;
        
        // Draw outer circle, the LED "glow"
        ctx.beginPath();
        ctx.globalAlpha = .5;
        
        // gradient that goes from the color to transparent 
        grd = ctx.createRadialGradient(led_midpoint_x, led_midpoint_y,
                                 r * 2,
                                 led_midpoint_x, led_midpoint_y,
                                 0);
        grd.addColorStop(0, "rgba(0,0,0,0)");
        grd.addColorStop(.5, color);

        
        ctx.arc(led_midpoint_x,  // Midpoint of LED for circle
                led_midpoint_y, 
                r,
                0, 2*Math.PI);
        ctx.fillStyle = grd;
        ctx.fill();
        
        // Draw inner circle as solid.
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(led_midpoint_x, led_midpoint_y, 
                (r - this.led_glow / 2) - 1,        
                0, 2*Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    };
    
    this.flipCanvas = function() {
        // Copies context of text_canvas to main canvas for drawing.
        this.context.drawImage(this.text_canvas,
                               0, 0, this.canvas.width, this.canvas.height,
                               0, 0, this.canvas.width, this.canvas.height);
    };

    this.resetScrolling = function() {
        this.scroll_pos_x = 0;
        this.scroll_pos_y = 0;
    };
    
    this.tick = function (timestamp) {
        // Scrolls LED screen in units of 1 LED like a real display would
        
        if (Math.abs(this.start_time - timestamp) >= 250) {
            this.start_time = timestamp;
            
            // Clear screen
            this.context.fillStyle = "#000";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Copy text to main canvas, shifted this.scroll_pos units
            // There needs to be one canvas always containing the unmodified RGB LED values
            this.context.drawImage(this.text_canvas, 
                                   this.scroll_pos_x, this.scroll_pos_y,
                                   this.canvas.width, this.canvas.height,
                                   0 , 0,
                                   this.canvas.width, this.canvas.height);
            
            // Adjust image position for next frame.
            // Each position is like a bit.
            // I guess a more HTML/CSS way be with classes scroll_left, right, etc.
            if(this.scroll_direction[0] == 'l' ) {
                this.scroll_pos_x += this.scroll_speed_x;
            }
            if(this.scroll_direction[1] == 'r') {
                this.scroll_pos_x -= this.scroll_speed_x;
            }
            if (this.scroll_direction[2] == 'd') {
                this.scroll_pos_y -= this.scroll_speed_y;
            }
            if(this.scroll_direction[3] == 'u') {
                this.scroll_pos_y += this.scroll_speed_y;
            }
            
            // Reset x and/or y scrolling if they go past canvas dimensions
            var reset_x = this.scroll_wrap_x ? this.cols + this.char_width: 0;
            var reset_y = this.scroll_wrap_y ? this.rows + this.char_height: 0;
            
            if(Math.abs(this.scroll_pos_x) > this.text_canvas.width) {
                this.scroll_pos_x = reset_x;
            }
            if(Math.abs(this.scroll_pos_y) > this.text_canvas.height) {
                this.scroll_pos_y = reset_y;
            }
        }
    };

    this.eraseCharacter = function (position, color) {
        // Fill a position with a solid color

        if (color === undefined) {
            color = 'black';
        }

        // Black out canvas because circles aren't completely covered when redrawn
        this.context.fillStyle = "#000";
        this.context.fillRect(position * this.led_pixel_width, 0,
                              this.char_width * this.led_pixel_width, this.canvas.height);
        
        // TODO: Assumes 5 pixel-wide characters
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < this.rows; j++) {
                this.setLEDXY(j, position + i, color);
            }
        }
    };

    this.drawCharacter = function (character, position, color, bg_color) {
        // Draws a character on the LED array at the specified position
        // Position is based on character, i.e. 5 LED increments.

        // Check for color
        if (color === undefined) {
            color = 'red';
        } else if (color == 'random') {
            color = random_hex_color();
        }

        if (bg_color === undefined) {
            bg_color = "#000000";
        }

        // TODO: Do we need a function for this? Just move that logic here?
        // Erase char that we are currently drawing
        this.eraseCharacter(position, bg_color);

        var character_bytes = alphabet[character];
        for (var y = 0; y < character_bytes.length; y++) {
            for (var x = 0; x < 8; x++) {
                if (get_bit_at_position(character_bytes[y], this.char_height - x)) {
                    // set the pixel if that bit is 1.
                    this.setLEDXY(x, position + y, color);
                }
            }
        }
    };

    this.drawString = function (led_text, text_color, bg_color) {
        // Draw more than one character on the screen.
        
        // Length in pixels for canvas. Add one LED for spaces between letters
        // TODO: Assumes fixed width characters
        var led_str_width = led_text.length * this.led_pixel_width * (this.char_width + 1);
        
        // setting width resets contents
        this.text_canvas.width = led_str_width;

        var smaller_chars = " []{}!:;'\"1il";
        var position = 0;
        for (var i = 0; i < led_text.length; i++) {
            var current_char = led_text.slice(i, i + 1);
            
            // Remove a space at the beginning for 3 LED wide characters
            if (position !== 0 && smaller_chars.indexOf(current_char) != -1) {
                position -= 1;
            }
            //console.log("Position: " + position.toString(10) + current_char);
            
            this.drawCharacter(current_char,
                position,
                text_color,
                bg_color);
            
            // Increment position only 5 LEDs for 3 LED chars
            if (smaller_chars.indexOf(current_char) != -1) {
                position += 5;
            } else {
                position += 6;
            }
        }
        this.flipCanvas();
    };  
}

$(document).ready(function () {
    var led_sim = new LEDScreen(NaN, NaN);

    var initial_text_color = "#f00";
    var initial_bg_color = "#000";

    $("#text-color").spectrum({
        preferredFormat: "hex",
        showInput: true,
        showInitial: true,
        color: initial_text_color,
        change: function (color) {
            console.log(color);
            $("#text-color").val(color.toHexString());
        }
    });
    
    $("#bg-color").spectrum({
        preferredFormat: "hex",
        showInput: true,
        showInitial: true,
        color: initial_bg_color,
        change: function (color) {
            console.log(color);
            $("#bg-color").val(color.toHexString());
        }
    });

    $("#display").html(led_sim.led_html)
        .height(led_sim.led_pixel_height * led_sim.rows)
        .width(led_sim.led_pixel_width * led_sim.cols);

    $(".LED").width(led_sim.led_pixel_width)
        .height(led_sim.led_pixel_height);

    var FPS = 60, // Frames per second
        cancelled = false; // global control of animation loop.

    function drawLoop(timestamp) {
        if (cancelled === false) {
            led_sim.tick(timestamp);
        }
        
        // setTimeout is necessary only to restrict it to 60 FPS
        setTimeout(function () {
            window.requestAnimationFrame(drawLoop);
        }, 1000 / FPS);
    }

    $("#start-animation").on('click', function (e) {
        e.preventDefault();
        led_sim.resetScrolling();
        var anim_id = requestAnimationFrame(drawLoop);
    });
    
    $("#scroll-direction").on('change', function() {
        //console.log($(this).val());
        led_sim.scroll_direction = $(this).val();
    });

    $('#update-text').on('click', function () {
        // Update the text of the LED screen.
        
        var led_text = document.getElementById('led-text').value;
        console.log(led_text);

        var text_color = $('#text-color').val();
        if (!text_color) {
            text_color = '#f00';
        }
        console.log(text_color);

        var bg_color = $("#bg-color").val();
        if (!bg_color) {
            current_color = "#000";
        }
        console.log(bg_color);
        
        led_sim.drawString(led_text, text_color, bg_color);
    });
});

