// Author: break_egg
// Title: rain_fall

#ifdef GL_ES
precision mediump float;
#endif

#define SIZE1  25.

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float N21(vec2 p){
	p = fract(p * vec2(233.34, 851.33));
    p += dot(p, p+23.45);
    return fract(p.x*p.y);
}

float char_0(vec2 uv){
    uv.xy = pow(uv.xy,vec2(2.,2.));
    uv.x+=0.8;
    float l = length(uv);
    float result = clamp(0.,1.,smoothstep(1.,0.95,pow(l,2.)));
    result -= smoothstep(0.8,0.75,pow(l,2.));
    return clamp(0.,1.,result);
}

float char_1(vec2 uv){
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
    uv.y+=u_time;
    float size = SIZE1;
    
    dot(vec3(1.),vec3(1.));
    
    vec2 id = floor(uv*size);

    float head =  N21(vec2(id.x)) - 1.;
    float headxy =  mod(N21(vec2(id)) - 1.*1.,1.);
    float image = char_0(uv)+0.3;
    float c = 0.;
    c = mod((head - uv.y)*1.,1.)/3.+0.66;
    // c *= image;
    // c *= headxy > 0.5 ? char_0( mod( (uv)*size , vec2(1.,1.) )*2.-1.) : char_1( mod( (uv)*size , vec2(1.,1.) )*2.-1.);
    
    vec3 color = vec3(0.3,1.,0.5)*c;
    gl_FragColor = vec4(vec3(c),1.0);
}