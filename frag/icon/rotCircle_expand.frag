// Author: break_egg
// Title: rotCircle_expand

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define SPEED 0.068
#define rotColor vec3(0.243,0.392,0.610)
#define expandCol1 vec3(1.,1.,1.)
#define expandCol2 vec3(0.1,0.5,1.)


float Circle(float l, float size){
    l -= u_time * SPEED;
    return (1.-mod(-l*10.,2.5))*.5;
}

float Point(vec2 uv, float size){
    float l = length(uv);
    return step(l,size);
}

vec3 expand(vec2 uv){
    float l = length(uv);
    float f = Circle(length(uv),0.288);
    
    float a = smoothstep(.5,0.600, length(uv-.0));
    vec3 color = mix(expandCol2,expandCol1,f);
    return color;
}



float rotCircle(vec2 uv){
    float c = Point(uv,.1);
    c -=  Point(uv,.08);
    float ang = u_time/2.;
    vec2 uv2 = uv * mat2 (vec2(cos(ang),-sin(ang)), vec2(sin(ang),cos(ang))) ;
    
    float square = 1.; //step(0., uv.x);
    square *= step(uv2.y, 0.020 );
    square *= step(-0.02, uv2.y);
    
    c -= square;
    
    c = clamp(c,0.,1.);
    return c;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 uv = st * 2.-1.;
    
    uv *= .25;
    
    float l = length(uv);
    float f = Circle(length(uv),0.288);
	vec3 color = expand(uv);
    

    float c = rotCircle(uv);
    color=mix(color, rotColor, c);

    
    gl_FragColor = vec4(color, mix(f*1.-l*2.,c,c) );

}