// Author: break_egg
// Title: char_1

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;




float char_1_1(vec2 uv){
    float x = 0.90;
    float y = 0.236;
    float l = smoothstep(x,x+0.05, 1.-abs(uv.x));
    l *= smoothstep(y,y+0.05, 1.-abs(uv.y));
    
    float ang = 0.800;
    vec2 uv2 = (uv-vec2(-0.150,0.540)) * mat2 (vec2(cos(ang),-sin(ang)), vec2(sin(ang),cos(ang))) ;
	 x = 0.90;
    y = 0.812;
    float l2 = smoothstep(x,x+0.05, 1.-abs(uv2.x));
    l2 *= smoothstep(y,y+0.05, 1.-abs(uv2.y));
    
    return clamp(0.,1.,l2)+clamp(0.,1.,l);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 uv = st * 2.-1.;

    vec3 color = vec3(0.);
	color += vec3(char_1_1(uv)); 	

    gl_FragColor = vec4(color,1.0);
}