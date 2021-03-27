const screen_size = Global.GetScreenSize();
var screen_width = Math.round(Global.GetScreenSize()[0]);
UI.AddCheckbox("Binds")
UI.AddSliderInt("binds x", 0, screen_size[0]);
UI.AddSliderInt("binds y", 0, screen_size[1]);
UI.AddSliderFloat("RGB Keybinds", 0.01, 1.0);
UI.AddLabel( " " );
UI.AddCheckbox("Speclist")
UI.AddSliderInt("Specs x", 0, screen_size[0]);
UI.AddSliderInt("Specs y", 0, screen_size[1]);
UI.AddSliderFloat("RGB Speclist", 0.01, 1.0);
UI.AddLabel( "  " );
UI.AddCheckbox("Watermark")
UI.AddCheckbox("Show ping")
UI.AddCheckbox("Show name")
UI.AddCheckbox("Show time")
UI.AddCheckbox("Show fps")
UI.AddCheckbox("Show ip")


function HSVtoRGB(h, s, v)
{
    var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6)
    {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

const in_bounds = function(vec, x, y, x2, y2) {
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

function values(name) {
     var value = UI.GetValue("MISC", "JAVASCRIPT", "Script items", name);
     return value;
}

const keybinds = function() {
    if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Binds") == true)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "binds x", true)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "binds y", true) 
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "RGB Keybinds", true)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", " ", true)  
    if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Binds") == false)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "binds x", false);
    if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Binds") == false)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "binds y", false)       
    if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Binds") == false)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "RGB Keybinds", false)
    if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Binds") == false)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", " ", false)   
    if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Binds") == true)

    var keybinds = [];
    if (UI.IsMenuOpen()) {                                                       keybinds.push("Menu is Open") };
    if (UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction")) {            keybinds.push("Freestand") };
    if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {            keybinds.push("Inverter") }; 
    if (UI.IsHotkeyActive("Rage", "Exploits", "Double tap")) {                   keybinds.push("Double Tap") };
    if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots")) {                   keybinds.push("Hide Shots") };
    if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {                   keybinds.push("Fake Duck") };
    if (UI.IsHotkeyActive("Rage", "General", "General", "Force body aim")) {     keybinds.push("Body Aim") };
    if (UI.IsHotkeyActive("Rage", "General", "General", "Force safe point")) {   keybinds.push("Safe Points") };
    if (UI.IsHotkeyActive("Rage", "General", "General", "Resolver override")) {   keybinds.push("Resolver Override") };
    if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) { keybinds.push ("SlowWalk")};
    if (UI.IsHotkeyActive("Misc", "GENERAL", "Movement", "Auto peek")) { keybinds.push ("Autopeek")};
    if (UI.IsHotkeyActive("Anti-Aim", "Rage Anti-Aim", "Right dir")) { keybinds.push ("Right Side")};
    if (UI.IsHotkeyActive("Anti-Aim", "Rage Anti-Aim", "Left dir")) { keybinds.push ("Left Side")};
    if (UI.IsHotkeyActive("Visual", "World", "View", "ThirdPerson")) { keybinds.push ("3rd view")};             

    const x = UI.GetValue("Script items", "binds x"),
    y = UI.GetValue("Script items", "binds y");   

    Render.FilledRect(x, y, 240, 40 + 20 * (keybinds.length - 1), [24, 24, 24, 255]);
    Render.FilledRect(x, y, 240, 15, [18, 21, 18, 255]);

    var colors = HSVtoRGB(Global.Realtime() * UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "RGB Keybinds"), 1, 1);

    Render.GradientRect(x, y, 240, 3, 1, [colors.g, colors.b, colors.r, 255], [colors.r, colors.g, colors.b, 255]);
    Render.GradientRect(x, y, 240, 3, 1, [colors.r, colors.g, colors.b, 255], [colors.b, colors.r, colors.g, 255]);
    var font = Render.AddFont("Smallest Pixel-7", 10, 100)
    var font2 = Render.AddFont("Smallest Pixel-7", 10, 100)
    Render.StringCustom(x + 100, y, 0, "KEYBINDS", [245, 245, 245, 255], font);
    for (i = 0; i < keybinds.length; i++){
        Render.StringCustom(x + 3, y + 20 + 20 * i, 0, keybinds[i], [124, 195, 220, 255], font2);
        Render.StringCustom(x + 190, y + 20 + 20 * i, 0, "enabled", [208, 245, 106, 255], font2);
    }

        if (Global.IsKeyPressed(1)) {
         const mouse_pos = Global.GetCursorPosition();
         if (in_bounds(mouse_pos, x, y, x + 320, y + 110)) {
          if (UI.IsMenuOpen( ) == false)
            return;
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "binds x", mouse_pos[0] - 200);
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "binds y", mouse_pos[1] - 60);
         }
     }
}


const get_spectators = function() {
    var spectators = [];
    const players = Entity.GetPlayers();
    for (i = 0; i < players.length; i++) {
        const cur = players[i];
        if (Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget") != "m_hObserverTarget") {
            const obs = Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget")
            if (obs === Entity.GetLocalPlayer()) {
                const name = Entity.GetName(cur);
                spectators.push(name);
            }
        }
    } return spectators;
}

const speclist = function(){
    if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Speclist") == true)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "Specs x", true)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "Specs y", true)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "RGB Speclist", true)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "  ", true)  
    if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Speclist") == false)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "Specs x", false);
    if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Speclist") == false)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "Specs y", false)       
    if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Speclist") == false)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "RGB Speclist", false)
    if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Speclist") == false)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "  ", false)

    if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Speclist") == true)    

    const names = get_spectators();
    var font3 = Render.AddFont("Smallest Pixel-7", 10, 100)
    var font4 = Render.AddFont("Smallest Pixel-7", 12, 100)
    const icon = Render.AddFont("untitled-font-1", 14, 100);
    const spects = Render.AddFont("Smallest Pixel-7", 13, 300);
    const x = UI.GetValue("Script items", "Specs x"),
    y = UI.GetValue("Script items", "Specs y");
    Render.FilledRect(x, y, 240, 40 + 20 * (names.length - 1), [24, 24, 24, 255]);
    Render.FilledRect(x, y, 240, 15, [18, 21, 18, 255]);

    var colors = HSVtoRGB(Global.Realtime() * UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "RGB Speclist"), 1, 1);

    Render.GradientRect(x, y, 240, 3, 1, [colors.g, colors.b, colors.r, 255], [colors.r, colors.g, colors.b, 255]);
    Render.GradientRect(x, y, 240, 3, 1, [colors.r, colors.g, colors.b, 255], [colors.b, colors.r, colors.g, 255]);

    Render.StringCustom(x + 100, y, 0, "Speclist", [245, 245, 245, 255], font3);
    for (i = 0; i < names.length; i++){
        Render.StringCustom(x + 30, y + 19 + 20 * i, 0, names[i], [124, 195, 220, 255], spects);
        Render.StringCustom(x + 6, y + 17 + 20 * i, 0, "d", [245, 245, 245, 255], icon);
        Render.StringCustom(x + 160, y + 19 + 20 * i, 0, "Spectating", [208, 245, 106, 255], font4);
    } 

        if (Global.IsKeyPressed(1)) {
         const mouse_pos = Global.GetCursorPosition();
         if (in_bounds(mouse_pos, x, y, x + 320, y + 110)) {
          if (UI.IsMenuOpen( ) == false)
            return;
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Specs x", mouse_pos[0] - 200);
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Specs y", mouse_pos[1] - 60);
         }
     }
}

const watermark = function(){  
    if (UI.GetValue("Watermark") == true)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "Show name", true)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "Show ping", true)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "Show time", true)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "Show fps", true)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "Show ip", true)   
    if (UI.GetValue("Script items", "Watermark") == false)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "Show name", false);
    if (UI.GetValue("Script items", "Watermark") == false)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "Show ping", false)       
    if (UI.GetValue("Script items", "Watermark") == false)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "Show time", false)
    if (UI.GetValue("Script items", "Watermark") == false)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "Show fps", false)       
    if (UI.GetValue("Script items", "Watermark") == false)
    UI.SetEnabled("MISC", "JAVASCRIPT", "Script Items", "Show ip", false)

    var username = Cheat.GetUsername()
    var fps = Math.floor(1 / Global.Frametime());
    var today = new Date();
    var ping = Math.floor(Global.Latency() * 1000 / 1.5);
    var ip = World.GetServerString()
    var hours1 = today.getHours();
    var minutes1 = today.getMinutes();
    var seconds1 = today.getSeconds();
    var hours = hours1 <= 9 ? "0" + today.getHours() + ":" : today.getHours() + ":";
    var minutes = minutes1 <= 9 ? "0" + today.getMinutes() + ":" : today.getMinutes() + ":";
    var seconds = seconds1 <= 9 ? "0" + today.getSeconds() : today.getSeconds()    ;

    var font = Render.AddFont("Smallest Pixel-7", 9, 900)
    var font1 = Render.AddFont("Smallest Pixel-7", 11, 900)

    var text = ""

    if (UI.GetValue("Script items", "Show name")) {
        text += (" | " + username)
    }
    if (UI.GetValue("Script items", "Show ping")) {
        text += (" | " + ping + " mc")
    }
    if (UI.GetValue("Script items", "Show time")) {
        text += (" | " + hours + minutes + seconds)
    }
    if (UI.GetValue("Script items", "Show fps")) {
        text += (" | " + fps + " fps")
    }
    if (UI.GetValue("Script items", "Show ip")) {
        text += (" | " + ip)
    }

    if (UI.GetValue("Watermark") == true)

    var h = 27;
    var w = Render.TextSizeCustom(text, font)[0] + 330;
    var x = Global.GetScreenSize()[0] - 2;
    var y = 12;
    x = x - w - 10;

    Render.FilledRect(x + 250, y + 13, w - 240, h - 12, [24, 24, 24, 255]);
    Render.FilledRect(x + 250, y + 13, w - 240, h - 24, [18, 21, 18, 255]);
    Render.StringCustom(x + 335, y + 15, 0, text, [255, 255, 255, 255], font)
    if (UI.GetValue("Watermark") == true)  
    Render.StringCustom(x + 260, y + 13, 0, "Game", [245, 245, 245, 255], font1)
    if (UI.GetValue("Watermark") == true)    
    Render.StringCustom(x + 295, y + 13, 0, "Sense", [208, 245, 106, 255], font1)
}

Global.RegisterCallback("Draw", "keybinds");
Global.RegisterCallback("Draw", "speclist");
Global.RegisterCallback("Draw", "watermark");