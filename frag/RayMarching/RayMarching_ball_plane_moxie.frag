// Author: break_egg
// Title: RayMarching_ball_plane

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// 最大步进次数
#define MAX_STEPS 100
// 最大步进距离 相当于 camera.far
#define MAX_DIST 100.
// 最小距离, 小于此距离, 视为相交
#define SURF_DIST.01

float getDis(vec3 p){
    float d_plane=p.y;
    
    vec3 sphere_pos=vec3(0,1,4);
    float r=1.;
    float d_sphere=length(sphere_pos-p)-r;
    
    float d=min(d_plane,d_sphere);
    return d;
}

float rayMarch(vec3 ro,vec3 rd){
    float d=0.;
    for(int i=0;i<MAX_STEPS;i++){
        vec3 p=ro+rd*d;
        float dS=getDis(p);
        d+=dS;
        if(d>MAX_DIST||dS<SURF_DIST){
            break;
        }
    }
    return d;
}

void main(){
    vec2 uv=(gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
    
    vec3 col=vec3(0);
    
    vec3 ro=vec3(0,1,0);
    vec3 rd=vec3(uv.x,uv.y,1);
    
    float d=rayMarch(ro,rd)/6.;
    col+=d;
    
    gl_FragColor=vec4(col,1.);
}