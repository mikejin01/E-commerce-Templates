"""Crop every recipe rect out of the CLEANED file at 4x and tile them.

The screening contact sheet was the wrong test: at 300px a cell, a 25px
wordmark on a card holder's spine is a smudge, and the Claspwallet shipped one
that way. This checks the exact places the recipe claims to have patched, at a
size where a surviving letter is unmistakable — the "verify by re-cropping the
saved file at 6-8x" rule in PLAN.md, applied to every op rather than by hand.
"""
import sys, os, glob; sys.path.insert(0,'.')
from PIL import Image, ImageDraw
from recipes import RECIPES, ADDON_RECIPES, FACT_RECIPES, ops_for
from manifest import MODELS

def crops(view_filter=None):
    out=[]
    for prod,(fam,cols) in MODELS.items():
        for cslug,_ in cols:
            for view in ('front','open','side'):
                if view_filter and view!=view_filter: continue
                p=f'clean/products/{prod}/{cslug}-{view}.png'
                if not os.path.exists(p): continue
                for op in ops_for(prod,view,cslug):
                    out.append((f'{prod[:9]}/{cslug[:9]}-{view[0]}:{op["id"]}', p, op['region']))
    for a,ops in ADDON_RECIPES.items():
        for op in ops: out.append((f'{a}:{op["id"]}', f'clean/addons/{a}-front.png', op['region']))
    for f,ops in FACT_RECIPES.items():
        for op in ops: out.append((f'{f}:{op["id"]}', f'clean/facts/{f}.jpg', op['region']))
    return out

def sheet(items, out, cell=300, cols=6):
    rows=(len(items)+cols-1)//cols
    s=Image.new('RGB',(cols*cell, rows*(cell+16)),(18,18,18)); d=ImageDraw.Draw(s)
    for i,(label,path,r) in enumerate(items):
        im=Image.open(path).convert('RGBA')
        bg=Image.new('RGBA',im.size,(245,244,240,255)); bg.alpha_composite(im); im=bg.convert('RGB')
        w,h=im.size
        cx,cy=(r[0]+r[2])/2*w,(r[1]+r[3])/2*h
        rw,rh=(r[2]-r[0])*w*1.7,(r[3]-r[1])*h*1.7
        box=(max(0,int(cx-rw/2)),max(0,int(cy-rh/2)),min(w,int(cx+rw/2)),min(h,int(cy+rh/2)))
        c=im.crop(box)
        z=min(cell/max(1,c.width), cell/max(1,c.height))
        c=c.resize((max(1,int(c.width*z)),max(1,int(c.height*z))), Image.LANCZOS)
        x,y=(i%cols)*cell,(i//cols)*(cell+16)
        d.text((x+2,y+2),label,fill=(255,235,90))
        s.paste(c,(x+(cell-c.width)//2, y+16+(cell-c.height)//2))
    s.save(out); print(out, s.size, len(items))

if __name__=='__main__':
    f=sys.argv[1] if len(sys.argv)>1 else None
    items=crops(None if f in (None,'all') else f)
    n=int(sys.argv[2]) if len(sys.argv)>2 else 0
    per=24
    chunk=items[n*per:(n+1)*per]
    if chunk: sheet(chunk, f'sheets/verify-{f or "all"}-{n}.png')
