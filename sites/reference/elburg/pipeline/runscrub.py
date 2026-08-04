import sys, os; sys.path.insert(0,'.')
from scrub import process
from recipes import RECIPES, ADDON_RECIPES, FACT_RECIPES, ops_for
from manifest import MODELS
def main(verbose=False):
    for prod,(fam,cols) in MODELS.items():
        for cslug,_ in cols:
            for view in ('front','open','side'):
                src=f'raw/products/{prod}/{cslug}-{view}.png'
                if not os.path.exists(src): continue
                log=process(src,f'clean/products/{prod}/{cslug}-{view}.png',ops_for(prod,view,cslug))
                if verbose:
                    print(f'{prod}/{cslug}-{view}')
                    for l in log: print(l)
    for f,ops in FACT_RECIPES.items():
        log=process(f'raw/facts/{f}.jpg', f'clean/facts/{f}.jpg', ops)
        if verbose:
            print(f)
            for l in log: print(l)
    for a,ops in ADDON_RECIPES.items():
        log=process(f'raw/addons/{a}-front.png', f'clean/addons/{a}-front.png', ops)
        if verbose:
            print(a)
            for l in log: print(l)
if __name__=='__main__': main('-v' in sys.argv)
