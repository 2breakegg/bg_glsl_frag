// Author: break_egg
// Title: char_0

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float char_0_0(vec2 uv){
    uv.x*=1.5;
    float l = length(uv);
    float result = smoothstep(1.,0.9,l);
    result -= smoothstep(0.8,0.7,l);
    return clamp(0.,1.,result);
}

float char_0_2(vec2 uv){
    uv.xy = pow(uv.xy,vec2(2.,2.));
    uv.x+=0.8;
    float l = length(uv);
    float result = clamp(0.,1.,smoothstep(1.,0.95,pow(l,2.)));
    result -= smoothstep(0.8,0.75,pow(l,2.));
    return clamp(0.,1.,result);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 uv = st * 2.-1.;

	vec3 color = vec3(char_0_0(uv*2.+vec2(1.,-1.)));
 	color += vec3(char_0_2(uv*2.-1.)); 	

    gl_FragColor = vec4(color,1.0);
}