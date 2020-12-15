// Author: break_egg
// Title: draw_triangle

#ifdef GL_ES
precision mediump float;
#endif

#define POS1 vec3(-0.885,-0.796,0.0)
#define POS2 vec3(1,0,0)
#define POS3 vec3(0,1,0)

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float draw_triangle(vec3 pos1, vec3 pos2, vec3 pos3, vec2 uv) {
    vec3 pos = vec3(uv,0.);
    vec3 d1 = pos2-pos1;
    vec3 d1p = pos-pos1;
    vec3 d2 = pos3-pos2;
    vec3 d2p = pos-pos2;
    vec3 d3 = pos1-pos3;
    vec3 d3p = pos-pos3;
    
    float c = step(0.,cross(d1,d1p).z) == step(0.,cross(d2,d2p).z) ? 1.:0.;
 	 c *= step(0.,cross(d1,d1p).z) == step(0.,cross(d3,d3p).z) ? 1.:0.;
    return c;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 uv = st * 2.-1.;
    vec3 pos = vec3(uv,0);
    
	float c = draw_triangle(POS1,POS2,POS3,uv);
    vec3 color = vec3(c);
    // color = vec3(st.x,st.y,abs(sin(u_time)));

    gl_FragColor = vec4(color,1.0);
}