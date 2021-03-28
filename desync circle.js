UI.AddCheckbox("Desync Circle")
UI.AddColorPicker("Desync Circle Color");

function render_arc(x, y, radius, radius_inner, start_angle, end_angle, segments, color) {
    while(360 % segments != 0) {
        segments++;
    }
    segments = 360 / segments;
    for(var i = start_angle; i < start_angle + end_angle; i = i + segments) {
        var rad = i * Math.PI / 180;
        var rad2 = (i + segments) * Math.PI / 180;
        var rad_cos = Math.cos(rad);
        var rad_sin = Math.sin(rad);
        var rad2_cos = Math.cos(rad2);
        var rad2_sin = Math.sin(rad2);
        var x1_outer = x + rad_cos * radius;
        var y1_outer = y + rad_sin * radius;
        var x2_outer = x + rad2_cos * radius;
        var y2_outer = y + rad2_sin * radius;
        var x1_inner = x + rad_cos * radius_inner;
        var y1_inner = y + rad_sin * radius_inner;
        var x2_inner = x + rad2_cos * radius_inner;
        var y2_inner = y + rad2_sin * radius_inner;
        Render.Polygon([
            [x1_outer, y1_outer],
            [x2_outer, y2_outer],
            [x1_inner, y1_inner]
        ], color);
        Render.Polygon([
            [x1_inner, y1_inner],
            [x2_outer, y2_outer],
            [x2_inner, y2_inner]
        ], color);
    }
}

const desync = function(){
if(UI.GetValue("Desync Circle")) {
    var adjust_angle = function(angle) {
        if(angle < 0) {
            angle = (90 + angle * (-1))
        } else if(angle > 0) {
            angle = (90 - angle)
        }
        return angle
    }
    var dsy = {
        "col": UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Desync Circle Color"),
        "inv": UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")
    }
    var local_player = Entity.GetLocalPlayer();
    if(Entity.IsAlive(local_player)) {
        var screens_size = Render.GetScreenSize();
        var screen_middle_x = screens_size[0] * 0.5;
        var screen_middle_y = screens_size[1] * 0.5;
        var view_angles = Local.GetViewAngles();
        var real_yaw = Local.GetRealYaw();
        var fake_yaw = Local.GetFakeYaw();
        var view_yaw = view_angles[1] - 180;
        var real = adjust_angle(real_yaw - view_yaw);
        var fake = adjust_angle(fake_yaw - view_yaw);
        render_arc(screen_middle_x, screen_middle_y, 7, 4, 0, 360, 32, [0, 0, 0, 255])
        render_arc(screen_middle_x, screen_middle_y, 7, 4, dsy.inv ? 90 : 270, dsy.inv ? 180 : 180, 32, dsy.col)
        render_arc(screen_middle_x, screen_middle_y, 15, 12, fake - (12 * 0.5), 44, 32, dsy.col)
    }
}
}

Cheat.RegisterCallback("Draw", "desync")