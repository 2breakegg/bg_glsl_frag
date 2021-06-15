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

// sphere.xyz 球的坐标 sphere.w 球的半径
float getSphereDis(vec4 sphere,vec3 p){
    return length(sphere.xyz-p)-sphere.w;
}

float getBoxDis(vec3 boxPos,vec3 boxSize,vec3 p){
    float dx=abs(p.x-boxPos.x)-boxSize.x;
    float dy=abs(p.y-boxPos.y)-boxSize.y;
    float dz=abs(p.z-boxPos.z)-boxSize.z;
    return max(max(dx,dy),dz);
}

float getDis(vec3 p){
    float d_plane=p.y;
    
    float d_sphere=getSphereDis(vec4(0,1,4,1),p);
    
    float d_box = getBoxDis(vec3(1,1,1)*sin(u_time)+vec3(2,1,5),vec3(1,1,1),p);
    
    float d=min(d_plane,d_sphere);
    d = min(d_box,d);
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
    
    float d=rayMarch(ro,rd)/12.;
    col+=d;
    
    gl_FragColor=vec4(col,1.);
}