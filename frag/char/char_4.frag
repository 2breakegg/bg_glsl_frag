// Author: break_egg
// Title: char_0

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;


#define S(a, b, t) smoothstep(a, b, t)
#define NUM_LAYERS 4.

// float line(vec2 p1,vec2 p2,vec2 uv){
//     float t = (uv.x-p2.x)/(p1.x-p2.x);
//     vec2 p = mix(p2,p1,t);
    
//     // return length(uv-p);
//     return smoothstep(0.1,0.5, 1.-length(uv-p));
// }

float df_line( in vec2 a, in vec2 b, in vec2 p)
{
    vec2 pa = p - a, ba = b - a;
	float h = clamp(dot(pa,ba) / dot(ba,ba), 0., 1.);	
	return length(pa - ba * h);
}

float line(vec2 a, vec2 b, vec2 uv) {
    float r1 = .05;
    float r2 = .04;
    
    float d = df_line(a, b, uv);
    float d2 = length(a-b);
    float fade = S(1.5, .5, d2);
    
    fade += S(.5, .02, abs(d2-.75));
    return S(r1, r2, d)*fade;
}

float char_4_1(vec2 uv){
    vec2 uv2= uv * vec2(0.5,-0.5) + vec2(0.5,0.5);
    vec2 p0 = vec2(.56,.19);
    vec2 p1 = vec2(.29,.63);
    vec2 p2 = vec2(.72,.63);
    
    vec2 p3 = vec2(0.61,0.19);
    vec2 p4 = vec2(0.61,.83);
    
    vec2 p5 = vec2(0.64,1.-.5);
    vec2 p6 = vec2(0.65,1.-.66);
    
    vec2 p7 = vec2(0.63,1.-.90);
    vec2 p8 = vec2(0.31,1.-.81);
    
    float f = line(p0,p1,uv2);
    // f = max(f,line(p1,p2,uv2));
    f += line(p1,p2,uv2);
    f += line(p3,p4,uv2);

    return f;
}


void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    st.x*=u_resolution.x/u_resolution.y;
    vec2 uv=st*2.-1.;
    
    vec3 color=vec3(char_4_1(uv*2.+vec2(1.,-1.)));
    
    gl_FragColor=vec4(color,1.);
}