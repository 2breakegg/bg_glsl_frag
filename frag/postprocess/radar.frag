// Author: break_egg
// Title:  radar

#ifdef GL_ES
precision mediump float;
#endif

#define POS1 vec3(-0.885,-0.796,0.0)
#define POS2 vec3(1,0,0)
#define POS3 vec3(0,1,0)
#define PI 3.1415926

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_trails[10];

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

float point(vec2 uv,vec2 pos){
    float l = length(pos-uv);
    return smoothstep(0.05,0.01,l);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 uv = st * 2.-1.;
	
   float f = acos(uv.x/length(uv));
    f = uv.y<0.? PI*2. - f: f;
    f /= PI*2.;
    f += u_time*0.2;
    f = 1.-mod(f,1.);
    
    
    float points = 0.;
    points += point(uv, vec2(0.5,0.5));
    points += point(uv, vec2(-0.540,-0.640));
    points += point(uv, vec2(0.280,-0.500));
    points += point(uv, vec2(-0.160,-0.060));
    
    // points += point(st, (u_mouse/u_resolution.xy* u_resolution.xy/u_resolution.yy));
    
    points += point(st*2., (u_trails[0]/u_resolution.xy* u_resolution.xy/u_resolution.yy)*2.*2.);
    points += point(st*2.2, (u_trails[1]/u_resolution.xy* u_resolution.xy/u_resolution.yy)*2.*2.2);
    points += point(st*2.4, (u_trails[2]/u_resolution.xy* u_resolution.xy/u_resolution.yy)*2.*2.4);
    points += point(st*2.6, (u_trails[3]/u_resolution.xy* u_resolution.xy/u_resolution.yy)*2.*2.6);
    points += point(st*2.8, (u_trails[4]/u_resolution.xy* u_resolution.xy/u_resolution.yy)*2.*2.8);
    points += point(st*3.0, (u_trails[5]/u_resolution.xy* u_resolution.xy/u_resolution.yy)*2.*3.0);
    points += point(st*3.2, (u_trails[6]/u_resolution.xy* u_resolution.xy/u_resolution.yy)*2.*3.2);
    points += point(st*3.4, (u_trails[7]/u_resolution.xy* u_resolution.xy/u_resolution.yy)*2.*3.4);
    
    f *= points+0.1;

    gl_FragColor = vec4(vec3(0.2,0.6,0.3)*f,1.0);
}